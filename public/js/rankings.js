function main() {
  populateTable();
}

async function populateTable() {

  get('/api/rankings', {}).then(rankings => {
    const { top, bottom } = rankings;
    let tableBody = document.getElementById("top-table");
    tableBody.innerHTML = "";
    for (let i = 0; i < top.length; i++) {
      let emojiTr = document.createElement('tr');

      let rankTd = document.createElement('td');
      rankTd.innerHTML = '<b>' + top[i].rank + '</b>';
      emojiTr.appendChild(rankTd);

      let emojiTd = document.createElement('td');
      emojiTd.innerText = top[i].emoji;
      emojiTr.appendChild(emojiTd);

      let nameTd = document.createElement('td');
      nameTd.innerText = top[i].name;
      emojiTr.appendChild(nameTd);

      let winTd = document.createElement('td');
      winTd.innerText = top[i].elo;
      emojiTr.appendChild(winTd);

      tableBody.appendChild(emojiTr);
    }

    let bottomBody = document.getElementById("bottom-table");
    bottomBody.innerHTML = "";
    for (let i = 0; i < bottom.length; i++) {
      let emojiTr = document.createElement('tr');

      let rankTd = document.createElement('td');
      rankTd.innerHTML = '<b>' + bottom[i].rank +'</b>';
      emojiTr.appendChild(rankTd);

      let emojiTd = document.createElement('td');
      emojiTd.innerText = bottom[i].emoji;
      emojiTr.appendChild(emojiTd);

      let nameTd = document.createElement('td');
      nameTd.innerText = bottom[i].name;
      emojiTr.appendChild(nameTd);

      let winTd = document.createElement('td');
      winTd.innerText = bottom[i].elo;
      emojiTr.appendChild(winTd);

      bottomBody.appendChild(emojiTr);
    }

  });
}

main();