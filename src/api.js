const express = require("express");
const router = express.Router();
const _ = require("lodash");
const emoji = require("node-emoji");

router.get('/emoji', (req,res)=> {
  emoji1 = emoji.random();
  emoji2 = emoji.random();
  while(emoji1.key === emoji2.key) {
    emoji2 = emoji.random();
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


module.exports = router;
