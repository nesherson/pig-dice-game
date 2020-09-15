/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores = [0, 0];
let roundScore = 0;
let activePlayer = 0;

function updateRoundScore(diceNumber) {
  if (diceNumber !== 0) {
    roundScore += diceNumber;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  }
}

function changeActivePlayer() {
  document
    .querySelector('.player-' + activePlayer + '-panel')
    .classList.remove('active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector('.player-' + activePlayer + '-panel')
    .classList.add('active');
}

document.querySelector('.dice').style.display = 'none'; // hice dice

document.querySelector('.btn-roll').addEventListener('click', () => {
  let diceNumber = Math.floor(Math.random() * 6) + 1;
  let diceSelector = document.querySelector('.dice');
  diceSelector.style.display = 'block'; //show dice
  diceSelector.src = 'dice-' + diceNumber + '.png';
  if (diceNumber !== 1) {
    updateRoundScore(diceNumber);
  } else {
    updateRoundScore(0);
    changeActivePlayer();
  }
});
