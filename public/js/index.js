
function main() {
  populateEmojiButtons();
  $("button").on("touchstart", function(){ 
    $(this).removeClass("mobileHoverFix");
  });
  $("button").on("touchend", function(){ 
    $(this).addClass("mobileHoverFix");
  });
}

async function getEmojis() {
  const emojis = await get('/api/emoji', {});
  console.log(emojis);
}

async function populateEmojiButtons() {
  const emojis = await get('/api/emoji', {});
  const emoji0Div = document.getElementById('emoji0');
  const emoji1Div = document.getElementById('emoji1');
  emoji0Div.setAttribute('title',emojis[0].key);
  emoji1Div.setAttribute('title',emojis[1].key);
  emoji0Div.innerHTML = `<span class='emoji' title=${emojis[0].key}>${emojis[0].emoji}</span>`;
  emoji1Div.innerHTML = `<span class='emoji' title=${emojis[1].key}>${emojis[1].emoji}</span>`;
}

async function vote0() {
  const emoji0Title = document.getElementById('emoji0').firstChild.getAttribute('title');
  const emoji1Title = document.getElementById('emoji1').firstChild.getAttribute('title');
  await post('/api/vote', {
    'winner': emoji0Title,
    'loser': emoji1Title
  });
  populateEmojiButtons();
}

async function vote1() {
  const emoji0Title = document.getElementById('emoji0').firstChild.getAttribute('title');
  const emoji1Title = document.getElementById('emoji1').firstChild.getAttribute('title');
  await post('/api/vote', {
    'winner': emoji1Title,
    'loser': emoji0Title
  });
  populateEmojiButtons();
}


main();