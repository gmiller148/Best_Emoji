const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { titleCase } = require('title-case');

const Emoji = require('./schemas/emoji');

const emojiByName = require('./emoji.json');
const EMOJIS_PER_TABLE = 25;
const ELO_SCALE = 32;


function randomEmoji() {
  const emojiKeys = Object.keys(emojiByName);
  const randomIndex = Math.floor(Math.random()*emojiKeys.length);
  const key = emojiKeys[randomIndex];
  return { key: key, emoji: emojiByName[key] };
}

router.get('/emoji', (req,res)=> {
  emoji1 = randomEmoji();
  emoji2 = randomEmoji();
  while(emoji1.key === emoji2.key) {
    emoji2 = randomEmoji();
  }
  
  res.send({
    0: {
      'emoji': emoji1.emoji,
      'key':emoji1.key
    },
    1: {
      'emoji': emoji2.emoji,
      'key':emoji2.key
    }
  });
});

router.post('/vote', (req,res) => {
  const {winner, loser} = req.body;

  Emoji.find({'name': {
    $in: [winner,loser]
  }}).then(results => {
    const winnerEmoji = _.find(results, {'name':winner});
    const loserEmoji = _.find(results, {'name':loser});

    const winnerELO = winnerEmoji !== undefined ? winnerEmoji.elo : 1000;
    const loserELO  = loserEmoji !== undefined ? loserEmoji.elo : 1000;

    const expectedOutcome = (1.0/(1.0 + Math.pow(10, ((winnerELO-loserELO)/400))));
    const winnerUpdated = winnerELO + ELO_SCALE * (1-expectedOutcome);
    const loserUpdated = loserELO + ELO_SCALE *(-expectedOutcome);

    if (winnerEmoji) {
      winnerEmoji.elo = winnerUpdated;
      winnerEmoji.wins += 1;
      winnerEmoji.save();
    } else {
      let newEmoji = new Emoji({
        name: winner,
        wins: 1,
        losses: 0,
        elo: winnerUpdated
      });
      newEmoji.save();
    }

    if(loserEmoji) {
      loserEmoji.elo = loserUpdated;
      loserEmoji.losses += 1;
      loserEmoji.save();
    } else {
      let newEmoji = new Emoji({
        name: loser,
        wins: 0,
        losses: 1,
        elo: loserUpdated
      });
      newEmoji.save();
    }
    
  });

  res.send({});
});


router.get('/rankings', (req,res) => {
  Emoji.find({}).sort({'elo': 'descending'}).then(result => {
    const top = [];
    const bottom = [];
    const numEmojis = Math.min(EMOJIS_PER_TABLE, result.length);

    for(var i = 0; i < numEmojis; i++) {
      let entry = result[i];
      top.push({
        'rank': i+1,
        'emoji': emojiByName[entry.name],
        'elo': Math.round(entry.elo),
        'name': titleCase(entry.name.toString().replace(/[_-]/g, ' '))
      });
    }

    for(var i = result.length - 1 ; i >= result.length - numEmojis; i--) {
      let entry = result[i];
      bottom.push({
        'rank': i+1,
        'emoji': emojiByName[entry.name],
        'elo': Math.round(entry.elo),
        'name': titleCase(entry.name.toString().replace(/[_-]/g, ' '))
      });
    }

    res.send({top:top, bottom:bottom});
  });
}); 

// router.get('/delete', (req,res) => {
//   Emoji.deleteMany({}, () => {});
//   res.send({});
// });

module.exports = router;
