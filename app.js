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
let gameOver = false;

function returnRandomNumber(maxValue) {
  return Math.floor(Math.random() * maxValue) + 1;
}

function updateRoundScore(diceNumber) {
  if (diceNumber !== 0) {
    roundScore += diceNumber;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  }
}

function updatePlayerScore(activePlayer, score) {
  let playerScore = document.getElementById('score-' + activePlayer);
  playerScore.textContent = score;
}

function setActivePlayer(player) {
  document
    .querySelector('.player-' + activePlayer + '-panel')
    .classList.remove('active');
  activePlayer = player;
  document
    .querySelector('.player-' + activePlayer + '-panel')
    .classList.add('active');
  document.querySelector('.dice').style.display = 'none';
}

function hold() {
  scores[activePlayer] += roundScore;
  updatePlayerScore(activePlayer, scores[activePlayer]);
  updateRoundScore(0);
  if (scores[activePlayer] >= 20) {
    gameOver = true;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document
      .querySelector('.player-' + activePlayer + '-panel')
      .classList.add('winner');
    return;
  }
  setActivePlayer(activePlayer === 0 ? 1 : 0);
}

function rollDice() {
  if (gameOver !== true) {
    let diceNumber = returnRandomNumber(6);
    let diceSelector = document.querySelector('.dice');
    diceSelector.style.display = 'block'; //show dice
    diceSelector.src = 'dice-' + diceNumber + '.png';
    if (diceNumber !== 1) {
      updateRoundScore(diceNumber);
    } else {
      updateRoundScore(0);
      setActivePlayer(activePlayer === 0 ? 1 : 0);
    }
  }
}

function newGame() {
  updatePlayerScore(0, 0);
  updatePlayerScore(1, 0);
  updateRoundScore(0);
  updateRoundScore(0);
  document.querySelector('#name-' + activePlayer).textContent =
    'Player ' + (activePlayer + 1);
  document
    .querySelector('.player-' + activePlayer + '-panel')
    .classList.remove('winner');
  setActivePlayer(returnRandomNumber(2) - 1);
  gameOver = false;
}

document.querySelector('.dice').style.display = 'none'; // hide dice
updatePlayerScore(0, 0); //setting player 1 score to 0
updatePlayerScore(1, 0); //setting player 2 score to 0

document.querySelector('.btn-new').addEventListener('click', newGame);
document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', hold);
