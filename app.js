/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, gameOver, sixRoll;

newGame();

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

function updatePlayerScore(activePlayer) {
  scores[activePlayer] += roundScore;
  let playerScore = document.getElementById('score-' + activePlayer);
  playerScore.textContent = scores[activePlayer];
}

function setActivePlayer(nextPlayer) {
  if (activePlayer !== undefined) {
    document
      .querySelector('.player-' + activePlayer + '-panel')
      .classList.remove('active');
    activePlayer = nextPlayer;
    document
      .querySelector('.player-' + activePlayer + '-panel')
      .classList.add('active');
    document.querySelector('.dice').style.display = 'none';
  } else {
    activePlayer = nextPlayer;
    document
      .querySelector('.player-' + activePlayer + '-panel')
      .classList.add('active');
    document.querySelector('.dice').style.display = 'none';
  }
}

function hold() {
  if (roundScore !== 0) {
    updatePlayerScore(activePlayer);
    updateRoundScore(0);
    sixRoll = [];
    if (scores[activePlayer] >= 50) {
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');
      gameOver = true;
      return;
    }
    setActivePlayer(activePlayer === 0 ? 1 : 0);
  }
}

function rollDice() {
  if (gameOver !== true) {
    let diceNumber = returnRandomNumber(6);
    let diceSelector = document.querySelector('.dice');
    diceSelector.style.display = 'block'; //show dice
    diceSelector.src = 'dice-' + diceNumber + '.png';
    if (diceNumber !== 1) {
      if (diceNumber === 6) {
        if (sixRoll.indexOf(diceNumber) !== -1) {
          updateRoundScore(0);
          scores[activePlayer] = 0;
          updatePlayerScore(activePlayer);
          setActivePlayer(activePlayer === 0 ? 1 : 0);
          sixRoll = [];
          return;
        } else {
          sixRoll.push(diceNumber);
        }
      }
      updateRoundScore(diceNumber);
    } else {
      updateRoundScore(0);
      sixRoll = [];
      setActivePlayer(activePlayer === 0 ? 1 : 0);
    }
  }
}

function newGame() {
  scores = [15, 15];
  sixRoll = [];
  roundScore = 0;
  setActivePlayer(returnRandomNumber(2) - 1);
  updatePlayerScore(0);
  updatePlayerScore(1);
  updateRoundScore(0);

  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');

  gameOver = false;
}

document.querySelector('.btn-new').addEventListener('click', newGame);
document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', hold);
