"use strict";

const score1el = document.querySelector("#score--1");
const score2el = document.querySelector("#score--2");

const current1el = document.querySelector("#current-1");
const current2el = document.querySelector("#current-2");

const diceimgel = document.querySelector(".diceimg");

const btnnew = document.querySelector(".newgame");
const btnroll = document.querySelector(".roldice");
const btnhold = document.querySelector(".hold");

const player1el = document.querySelector(".player--1");
const player2el = document.querySelector(".player--2");

let score, currentScore, activeplayer, playing;

const init = function () {
  score = [0, 0];
  currentScore = 0;
  activeplayer = 1;
  playing = true;

  score1el.textContent = 0;
  score2el.textContent = 0;
  current1el.textContent = 0;
  current2el.textContent = 0;

  diceimgel.classList.add("hidden");
  player1el.classList.remove("winner");
  player2el.classList.remove("winner");
  player1el.classList.add("active");
  player2el.classList.remove("active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current-${activeplayer}`).textContent = 0;
  currentScore = 0;
  activeplayer = activeplayer === 1 ? 2 : 1;
  player1el.classList.toggle("active");
  player2el.classList.toggle("active");
};

btnroll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    diceimgel.classList.remove("hidden");
    diceimgel.src = `dice-${dice}.png`;

    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current-${activeplayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnhold.addEventListener("click", function () {
  if (playing) {
    score[activeplayer - 1] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      score[activeplayer - 1];

    if (score[activeplayer - 1] >= 20) {
      playing = false;
      diceimgel.classList.add("hidden");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("winner");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove("active");
    } else {
      switchPlayer();
    }
  }
});

btnnew.addEventListener("click", init);
