
async function getEmojis() {
  const emojis = await get('/api/emoji', {});
  console.log(emojis);
}

async function populateEmojiButtons() {
  const emojis = await get('/api/emoji', {});
  const emoji0Div = document.getElementById('emoji0');
  const emoji1Div = document.getElementById('emoji1');
  
  emoji0Div.innerHTML = `<span class='emoji'>${emojis[0].emoji}</span>`;
  emoji1Div.innerHTML = `<span class='emoji'>${emojis[1].emoji}</span>`;
}

populateEmojiButtons();
