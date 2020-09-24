let sortState = {
  0: 0, // 1 is sort high to low, 2 is sort low to high
  1: 0,
  2: 0,
  3: 0
};

const THEAD_LABELS = {
  0: "Rank",
  1: "Emoji",
  2: "Name",
  3: "Win %"
};

const HEAD_NUMBER = 4;

function main() {
  populateTable();
  addSorters();
}

function sortTable(number) {
  if (sortState[number] === 0) {
    for (let i = 0; i < HEAD_NUMBER; i++) {
      sortState[i] = 0;
    }
    sortState[number] = 1;
  } else if (sortState[number] === 1) {
    sortState[number] = 2;
  } else {
    sortState[number] = 1;
  }

  const state = sortState[number];
  number = parseInt(this.id.substring(3));
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("emoji-table");
  // console.log(table.innerHTML);
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[number];
      y = rows[i + 1].getElementsByTagName("TD")[number];
      //check if the two rows should switch place:
      if (number === 1 || number === 2) {
        const comp = state === 1 ? x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase() : x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase();
        if (comp) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else {
        const comp = state === 1 ? parseFloat(x.innerText) < parseFloat(y.innerText) : parseFloat(x.innerText) > parseFloat(y.innerText);
        if (comp) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

function addSorters() {
  for (let i = 0; i < HEAD_NUMBER; i++) {
    let currentTH = document.getElementById('no-' + i);
    currentTH.addEventListener('click', sortTable);
  }
}

async function populateTable() {
  let tableBody = document.getElementsByTagName('TBODY')[0];
  await get('/api/rankings', {}).then(rankings => {
    tableBody.innerHTML = "";
    console.log(rankings);
    for(let i = 0; i < rankings.length; i++) {
      let emojiTr = document.createElement('tr');

      let rankTd = document.createElement('td');
      rankTd.innerText = i+1;
      emojiTr.appendChild(rankTd);

      let emojiTd = document.createElement('td');
      emojiTd.innerText = rankings[i].emoji;
      emojiTr.appendChild(emojiTd);

      let nameTd = document.createElement('td');
      nameTd.innerText = rankings[i].name;
      emojiTr.appendChild(nameTd);

      let winTd = document.createElement('td');
      winTd.innerText = rankings[i].ratio;
      emojiTr.appendChild(winTd);

      tableBody.appendChild(emojiTr);
    }
  });
}

main();