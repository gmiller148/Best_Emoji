const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { titleCase } = require('title-case');

const Emoji = require('./schemas/emoji');

const emojiByName = require('./emoji.json');
const EMOJIS_PER_TABLE = 20;


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

  Emoji.findOne({name: winner}).then(emoji => {
    if(emoji) {
      emoji.wins += 1;
      emoji.ratio = emoji.wins/(emoji.wins+emoji.losses)
      emoji.save();
    } else {
      let newEmoji = new Emoji({
        name: winner,
        wins: 1,
        losses: 0,
        ratio: 1
      });
      newEmoji.save();
    }
  });

  Emoji.findOne({name: loser}).then(emoji => {
    if(emoji) {
      emoji.losses += 1;
      emoji.ratio = emoji.wins/(emoji.wins+emoji.losses)
      emoji.save();
    } else {
      let newEmoji = new Emoji({
        name: loser,
        wins: 0,
        losses: 1,
        ratio: 0
      });
      newEmoji.save();
    }
  });

  res.send({});
});


router.get('/rankings', (req,res) => {
  Emoji.find({}).sort({'ratio': 'descending'}).then(result => {
    const top = [];
    const bottom = [];
    const numEmojis = Math.min(EMOJIS_PER_TABLE, result.length);

    for(var i = 0; i < numEmojis; i++) {
      let entry = result[i];
      top.push({
        'rank': i+1,
        'emoji': emojiByName[entry.name],
        'ratio': Math.round(entry.ratio*100),
        'name': titleCase(entry.name.toString().replace(/_/g, ' '))
      });
    }

    for(var i = result.length - numEmojis; i < result.length; i++) {
      let entry = result[i];
      bottom.push({
        'rank': i+1,
        'emoji': emojiByName[entry.name],
        'ratio': Math.round(entry.ratio*100),
        'name': titleCase(entry.name.toString().replace(/_/g, ' '))
      });
    }

    res.send({top:top, bottom:bottom});
  });
});

router.get('/delete', (req,res) => {
  Emoji.deleteMany({}, () => {});
  res.send({});
});

module.exports = router;
