const background = document.querySelector(".background");
const dino = document.querySelector(".dino");
const gameOverWrapper = document.querySelector(".game-over-wrapper");
const mainFrame = document.querySelector("#mainframe");
const scoreLabel = document.querySelector("#score");
const currentScoreLabel = document.querySelector("#current-score");
const highscoreLabel = document.querySelector("#highscore");
const btnTentarNovamente = document.querySelector("#btn-tentar-novamente");

let score = 0;
let highSchore = 0;

let gameOver = false;

//clássica de verificação
let isJumping = false;

//position Y do Dino
let positionZero = 30;
//listener do botão solto
document.addEventListener("keydown", myKeyUp);

document.body.onclick = () => jump();

//function de handle dos botões do teclado
function myKeyUp(e) {
  if (e.keyCode == 32) {
    console.log("\n espaço");
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (positionZero > 55) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (positionZero <= 30) {
          clearInterval(downInterval);
          positionZero = 30;
          isJumping = false;
        } else {
          positionZero -= 1;
        }
        dino.style.bottom = positionZero + "%";
      }, 20);
    } else {
      positionZero += 2;

      dino.style.bottom = positionZero + "%";
    }
  }, 20);
}

function createCactus() {
  let cactus = document.createElement("div");
  let cactusPos = 1500;
  let randomTime = Math.min(2000, Math.random() * 8000);

  cactus.classList.add("cactus");
  cactus.style.left = cactusPos + "px";

  document.body.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (gameOver) return clearInterval(leftInterval);
    score += 0.1;
    currentScoreLabel.textContent = Math.floor(score);

    if (cactus < -60) {
      document.body.removeChild(cactus);
      return clearInterval(leftInterval);
    }

    if (cactusPos > 0 && cactusPos < 40 && positionZero < 40) {
      //colisão e gameover
      clearInterval(leftInterval);
      clearTimeout(createCactus);
      document.body.classList.add("game-over");
      scoreLabel.textContent = Math.floor(score);
      gameOver = true;

      highSchore = Math.max(highSchore, score);
      return (highscoreLabel.textContent = Math.floor(highSchore));
    }

    cactusPos -= 10;
    cactus.style.left = cactusPos + "px";
  }, 20);

  if (gameOver) return;

  setTimeout(createCactus, randomTime);
}
createCactus();

btnTentarNovamente.addEventListener("click", () => {
  const cactus = document.querySelectorAll(".cactus");

  cactus.forEach((cact) => (cact.style.display = "none"));

  gameOver = false;
  score = 0;

  createCactus();
  document.body.classList.remove("game-over");
});
