'use strict';

// DOM
const score_0 = document.getElementById('score--0');
const score_1 = document.getElementById('score--1');
const currentScore_0 = document.getElementById('current--0');
const currentScore_1 = document.getElementById('current--1');

const diceEl = document.querySelector('.dice--img');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const inputNumber = document.getElementById('inputNum');
const btnInput = document.querySelector('.inputWinScore-btn');

const current0 = document.querySelector('.current-0');
const current1 = document.querySelector('.current-1');

const divWinGame = document.querySelector('.divWinGame');

// Start up variables
let currentScore, activePlayer, winScore;
const score = [0, 0];
let winGame = false;

// Sound
const startgame = './sound/startgame.wav';
const rolldice = './sound/rolldice.wav';
const holdsound = './sound/holdsound.wav';
const enterScore = './sound/enterscore.wav';
const gameover = './sound/gameover.wav';
const rollone = './sound/number1roll.wav';

function playAudio(audio) {
  const soundEffect = new Audio(audio);
  soundEffect.play();
}

// start up function back to zero and initial style
function startUp() {
  playAudio(startgame);
  winGame = false;
  score[0] = 0;
  score[1] = 0;
  score_0.textContent = 0;
  score_1.textContent = 0;

  currentScore_0.textContent = 0;
  currentScore_1.textContent = 0;
  currentScore = 0;
  activePlayer = 0;

  current0.classList.add('active');
  current1.classList.remove('active');

  diceEl.classList.add('hidden');
  btnInput.classList.remove('hidden');
  divWinGame.classList.add('hidden');

  inputNumber.value = 0;
  winScore = 10;
}

startUp();

// Start next player turn
function nextPlayer() {
  playAudio(rollone);
  currentScore = 0;
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  current0.classList.toggle('active');
  current1.classList.toggle('active');
}

// Roll function
btnRoll.addEventListener('click', function () {
  playAudio(rolldice);
  if (!winGame) {
    // Generate a random dice value
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `./img/dice-${dice}.png`;

    // Check if dice is 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      nextPlayer();
    }
  }
});

// Save Current Score
btnHold.addEventListener('click', function () {
  playAudio(holdsound);
  // disable button using boolean variable
  if (!winGame) {
    // Add current score to main score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= winScore) {
      gameOver(activePlayer);
    } else {
      //switch player
      nextPlayer();
    }
  }
});

// Restart Game
btnNew.addEventListener('click', function () {
  playAudio(startgame);
  startUp();
});

// Get input value
btnInput.addEventListener('click', function () {
  playAudio(enterScore);
  winScore = Number(inputNumber.value);
  btnInput.classList.add('hidden');
});

// Game Over
function gameOver(activePlayer) {
  winGame = true;
  playAudio(gameover);

  // show gray background div with z-index
  divWinGame.classList.remove('hidden');

  // create popup window to notify who wins and the game is over
  const popUp = document.createElement('div');
  popUp.classList.add('popUp');
  popUp.textContent = `Game Over! Player ${activePlayer + 1} Win! `;
  divWinGame.appendChild(popUp);

  // Detect enter key for window event listener
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      startUp();
    } else {
      return;
    }
  });
}
