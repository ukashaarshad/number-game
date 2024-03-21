"use strict";

// Selceting Elements
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelectorAll(".dice");
const btnNew = document.querySelectorAll(".btn--new");
const btnRoll = document.querySelectorAll(".btn--roll");
const btnHold = document.querySelectorAll(".btn--hold");
let playing, scores, currentScore, activePlayer;

const init = function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.forEach(function (btn) {
    btn.classList.add("hidden");
  });

  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  player0EL.classList.add("player--active");
  player1EL.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle("player--active");
  player1EL.classList.toggle("player--active");
};

// Starting Conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.forEach(function (btn) {
  btn.classList.add("hidden");
});

//Rolling Dice Functionality
const rollDiceFunction = function () {
  if (playing) {
    // Generatng a random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    // showing the dice
    diceEl.forEach(function (btn) {
      btn.classList.remove("hidden");
      btn.src = `dice${dice}.png`;
    });

    // diceEl.classList.remove("hidden");
    // diceEl.src = `dice${dice}.png`;

    // check for rolled 1
    if (dice !== 1) {
      //add dice to current scroe
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    //swith to other player
    else {
      switchPlayer();
    }
  }
};

const holdFunction = function () {
  if (playing) {
    //add current score to active players score
    scores[activePlayer] += currentScore;
    // eg score[1] = score[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if player won
    if (scores[activePlayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.forEach(function (btn) {
        btn.classList.add("hidden");
      });
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
};

//New Game Function
// btnNew.addEventListener("click", init);
btnNew.forEach(function (btn) {
  btn.addEventListener("click", init);
});

btnRoll.forEach(function (btn) {
  btn.addEventListener("click", rollDiceFunction);
});

btnHold.forEach(function (btn) {
  btn.addEventListener("click", holdFunction);
});
