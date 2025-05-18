const { config } = require('dotenv');
config();
const express = require('express');

const champions = require('./champions.json').data;
const championKeys = Object.keys(champions);

const app = express();
app.use(express.json());

function rollChampion(previousChampions) {
  const rolledKey =
    championKeys[Math.floor(Math.random() * championKeys.length)];
  const rolledChampion = champions[rolledKey];

  if (previousChampions.includes(rolledChampion.id)) {
    return rollChampion(previousChampions);
  }

  return rolledChampion;
}

app.get('/api/roll', async (req, res) => {
  const { previousChampions = [] } = req.body;

  return res.status(200).send(rollChampion(previousChampions));
});

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});

