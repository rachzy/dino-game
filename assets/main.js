const background = document.querySelector(".background");
const monkey = document.querySelector(".monkey");
const gameOverWrapper = document.querySelector(".game-over-wrapper");
const mainFrame = document.querySelector("#mainframe");
const scoreLabel = document.querySelector("#score");
const currentScoreLabel = document.querySelector("#current-score");
const highscoreLabel = document.querySelector("#highscore");
const btnTentarNovamente = document.querySelector("#btn-tentar-novamente");
const pressSpace = document.querySelector("#press-space");

// Soundtrack
const soundtrack = new Audio("./assets/audios/soundtrack.mp3");

let gameStarted = false;

let score = 0;
let highSchore = 0;

let gameOver = false;

//clássica de verificação
let isJumping = false;

// level do game
let level = 1;

//position Y do monkey
let positionZero = 27;
//listener do botão solto
document.addEventListener("keydown", myKeyUp);

document.body.onclick = (e) => {
  if (e.target.className.startsWith("button")) return;

  jump();
};

//function de handle dos botões do teclado
function myKeyUp(e) {
  if (!gameStarted) {
    soundtrack.play();
    createBanana();

    gameStarted = true;
    pressSpace.style.display = "none";
  }
  if (e.key === " " && !isJumping) {
    jump();
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (positionZero > 55) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (positionZero <= 27) {
          clearInterval(downInterval);
          positionZero = 27;
          isJumping = false;
        } else {
          positionZero -= 1;
        }
        monkey.style.bottom = positionZero + "%";
      }, 20);
    } else {
      positionZero += 2;

      monkey.style.bottom = positionZero + "%";
    }
  }, 20);
}

function createBanana() {
  let banana = document.createElement("div");
  let bananaPos = 1500;
  let randomTime = Math.min(3700, Math.random() * 9000);

  banana.classList.add("banana");
  banana.style.left = bananaPos + "px";

  mainFrame.appendChild(banana);

  let leftInterval = setInterval(() => {
    if (gameOver) return clearInterval(leftInterval);
    score += 0.1;
    currentScoreLabel.textContent = Math.floor(score);

    if (banana < -60) {
      mainFrame.removeChild(banana);
      return clearInterval(leftInterval);
    }

    if (bananaPos > 0 && bananaPos < 40 && positionZero < 40) {
      //colisão e gameover
      clearInterval(leftInterval);
      clearTimeout(createBanana);
      document.body.classList.add("game-over");
      scoreLabel.textContent = Math.floor(score);
      gameOver = true;
      gameStarted = false;
      soundtrack.pause();

      highSchore = Math.max(highSchore, score);
      return (highscoreLabel.textContent = Math.floor(highSchore));
    }

    bananaPos -= 10 + 2 * level;
    banana.style.left = bananaPos + "px";
  }, 20 - 2 * level);

  if (gameOver) return;

  setTimeout(createBanana, randomTime);
}

setInterval(() => {
  background.classList.remove(`level-${level}`);

  if (gameOver || !gameStarted) return;
  if (level >= 8) return;
  level++;

  background.classList.add(`level-${level}`);
}, 10000);

btnTentarNovamente.addEventListener("click", () => {
  soundtrack.currentTime = 0;
  soundtrack.play();

  const banana = document.querySelectorAll(".banana");

  banana.forEach((cact) => (cact.style.display = "none"));

  gameOver = false;
  score = 0;
  level = 1;

  createBanana();
  gameStarted = true;
  document.body.classList.remove("game-over");
});
