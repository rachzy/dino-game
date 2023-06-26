const background = document.querySelector(".background");
const myBody = document.querySelector(".body");
const dino = document.querySelector(".dino");

//clássica de verificação
let isJumping = false;

//position Y do Dino
let positionZero = 50;
//listener do botão solto
document.addEventListener("keydown", myKeyUp);

myBody.onclick = () => jump();

//function de handle dos botões do teclado
function myKeyUp(e) {
  console.log(e.key + ", " + e.keyCode);
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
    if (positionZero > 75) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (positionZero <= 50) {
          clearInterval(downInterval);
          positionZero = 50;
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

  myBody.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPos < -60) {
      myBody.removeChild(cactus);
      clearInterval(leftInterval);
    } else if (cactusPos > 0 && cactusPos < 60 && positionZero < 60) {
      //colisão e gameover
      clearInterval(leftInterval);
      clearTimeout(createCactus);
      document.body.innerHTML = "<h1 class='game-over'>Fim de jogo</h1>";
    } else {
      cactusPos -= 10;
      cactus.style.left = cactusPos + "px";
    }
  }, 20);

  setTimeout(createCactus, randomTime);
}
createCactus();
