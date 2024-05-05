let gameseq = [];
let userseq = [];
let highscore = [0];

let btns = ["yellow", "green", "red", "purple"];
let started = false;
let level = 0;

let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
  if (started == false) {
    started = true;

    levelUp();
  }
});

function btnFlash(randbtn) {
  randbtn.classList.add("flash");
  setTimeout(function () {
    randbtn.classList.remove("flash");
  }, 150);
}

function levelUp() {
  userseq = [];
  level++;
  h3.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 3);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);

  btnFlash(randBtn);
  gameseq.push(randColor);
  highscore.push(level);
}

function checkAns(idx) {
  if (userseq[idx] === gameseq[idx]) {
    if (userseq.length == gameseq.length) {
      setTimeout(function () {
        levelUp();
      }, 800);
    }
  } else {
    h3.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Press any key to restart`;
    restart();
    highScore();

    let body = document.querySelector("body");
    body.style.backgroundColor = "red";
    setTimeout(function () {
      body.style.backgroundColor = "white";
    }, 100);
  }
}

function btnPress() {
  let btn = this;
  btnFlash(btn);
  let userColor = btn.getAttribute("id");
  userseq.push(userColor);
  checkAns(userseq.length - 1);
}

let allbtn = document.querySelectorAll(".btn");
for (btn of allbtn) {
  btn.addEventListener("click", btnPress);
}

function restart() {
  userseq = [];
  gameseq = [];
  started = false;
  level = 0;
}

function highScore() {
  let h3 = document.querySelector(".highscore");
  let max = Math.max(...highscore);
  h3.innerText = `High Score : ${max}`;
}
