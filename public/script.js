const BASE_CHAMPION_ICON_URL = 'https://ddragon.leagueoflegends.com/cdn/15.10.1/img/champion';

var rolledChampions = [];

async function rollChampion() {
  const response = await fetch('/api/roll', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      previousChampions: rolledChampions.map(champion => champion.id)
    })
  });
  const data = await response.json();

  rolledChampions = [ ...rolledChampions, data ];

  updateListElements();

  if (rolledChampions.length >= 3) {
    document.getElementById('roll-button').setAttribute('disabled', true);
  }
}

function updateListElements() {
  let championListElement = document.getElementById('champion-list');
  championListElement.innerHTML = '';

  for (let i = 0; i < rolledChampions.length; i++) {
    let champion = rolledChampions[i];

    let championElement = document.createElement('div');
    championElement.setAttribute('class', 'champion');
    let championImageElement = document.createElement('img');
    let championNameElement = document.createElement('p');

    championImageElement.setAttribute('src', `${BASE_CHAMPION_ICON_URL}/${champion.id}.png`);
    championElement.appendChild(championImageElement);

    championNameElement.innerHTML = champion.name;
    championElement.appendChild(championNameElement);

    championListElement.appendChild(championElement);
  }
}

