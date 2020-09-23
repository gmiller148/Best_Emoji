const express = require("express");
const router = express.Router();
const _ = require("lodash");
const nodeEmoji = require("node-emoji");

const Emoji = require('./schemas/emoji');


router.get('/emoji', (req,res)=> {
  emoji1 = nodeEmoji.random();
  emoji2 = nodeEmoji.random();
  while(emoji1.key === emoji2.key) {
    emoji2 = nodeEmoji.random();
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

  // Emoji.findOne({key: winner}).then(emoji => {
  //   if(emoji) {
  //     emoji.wins += 1;
  //     emoji.ratio = emoji.wins/(emoji.wins+emoji.losses)
  //     emoji.save();
  //   } else {
  //     let newEmoji = new Emoji({
  //       name: winner,
  //       wins: 1,
  //       losses: 0,
  //       ratio: 1
  //     });
  //     newEmoji.save();
  //   }
  // });

  // Emoji.findOne({key: loser}).then(emoji => {
  //   if(emoji) {
  //     emoji.losses += 1;
  //     emoji.ratio = emoji.wins/(emoji.wins+emoji.losses)
  //     emoji.save();
  //   } else {
  //     let newEmoji = new Emoji({
  //       name: loser,
  //       wins: 0,
  //       losses: 1,
  //       ratio: 0
  //     });
  //     newEmoji.save();
  //   }
  // });

  res.send({});
});

module.exports = router;
