const background = document.querySelector(".background");
const dino = document.querySelector(".dino");

//clássica de verificação
let isJumping = false;

//listener do botão solto
document.addEventListener("keydown", myKeyUp);

//function de handle dos botões do teclado
function myKeyUp(e) 
{
    console.log(e.key + ", " + e.keyCode);
    if(e.keyCode == 32)
    {
        console.log("\n espaço");
        if(!isJumping)
        {
            jump();    
        }
    }
} 

function jump()
{
    let positionZero = 50;
    isJumping = true;

    let upInterval = setInterval(() => {
        if(positionZero > 75)
        {
            clearInterval(upInterval);
            let downInterval = setInterval(() =>{
                if(positionZero <= 50)
                {
                    clearInterval(downInterval);
                    positionZero = 50;
                    isJumping = false;
                }
                else
                {
                    positionZero -= 2;
                }
                dino.style.bottom = positionZero + "%";
            }, 10);
        }
        else
        {
            positionZero += 2;
        
        dino.style.bottom = positionZero + "%";
        }
    }, 10);
}

function createCactus()
{
    let cactus = document.createElement("div");
    let cactusPos = 1000;

    cactus.classList.add("cactus");
    cactus.style.left = cactusPos + "px";

    background.appendChild(cactus);
}

createCactus();