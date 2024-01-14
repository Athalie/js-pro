import "./style.css";
import mwalkPath from "./assets/M-walk.png";

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

const shots = 3;
let step = 0;

const canvas = document.getElementById("game") as HTMLCanvasElement | null;

if (!canvas) {
  throw new Error("Canvas not found");
}

const ctx = canvas.getContext("2d");
//console.dir(ctx);

let keyPress = false;
let direction = 0;
let characterX = 0;
let characterY = 0;

function keyDownHandler(event: KeyboardEvent) {
  switch (event.key) {
    case "ArrowUp":
    case "Up":
      keyPress = true;
      direction = 3;
      break;
    case "ArrowRight":
    case "Right":
      keyPress = true;
      direction = 2;
      break;
    case "ArrowDown":
    case "Down":
      keyPress = true;
      direction = 0;
      break;
    case "ArrowLeft":
    case "Left":
      keyPress = true;
      direction = 1;
      break;
  }
}

let lastTimeUpdate = 0;

function animate(time: DOMHighResTimeStamp) {
  const deltaTime = time - lastTimeUpdate;

  lastTimeUpdate = time;

  const delta = 0.1 * deltaTime;

  if (ctx) {
    // ctx.strokeStyle = 'rgba(123, 145, 32, .7)';
    // ctx.strokeRect(100, 100, 200, 100);
    //
    // ctx.fillStyle = '#29333d'
    // ctx.fillRect(200, 200, 200, 100);
    //
    // ctx.strokeStyle = 'green';
    // ctx.strokeRect(150, 150, 200, 100);
    //
    // ctx.clearRect(90, 90, 150, 150)

    //  ctx.beginPath();
    //  ctx.moveTo(10, 30);
    //  ctx.lineTo(400, 100);
    // // ctx.stroke();
    //
    //  ctx.lineTo(500, 500);
    //  ctx.lineTo(10, 500);
    //  ctx.fill();
    //  ctx.stroke();

    // let i = 0;
    //
    // setInterval(() => {
    //     ctx.clearRect(0,0,canvas.width, canvas.height);
    //     ctx.fillRect(i, i, 20, 20);
    //    // i = Math.random() * 600;
    //
    //     i = i > 600 ? 0 : i + 10;
    //
    // }, 100)
    const image = document.createElement("img");

    image.src = mwalkPath;

    image.onload = () => {
      if (keyPress) {
        step = (step + 0.01 * deltaTime) % shots;
        switch (direction) {
          case 0:
            characterY =
              characterY > CANVAS_HEIGHT - 64
                ? CANVAS_HEIGHT - 64
                : characterY + delta;
            break;
          case 1:
            characterX = characterX < 64 ? 0 : characterX - delta;
            break;
          case 2:
            characterX =
              characterX > CANVAS_WIDTH - 64
                ? CANVAS_WIDTH - 64
                : characterX + delta;
            break;
          case 3:
            characterY = characterY < 0 ? 0 : characterY - delta;
            break;
        }
      }
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(
        image,
        48 * Math.floor(step),
        48 * direction,
        48,
        48,
        characterX,
        characterY,
        64,
        64,
      );
    };
  }

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

function keyUpHandler() {
  keyPress = false;
  direction = 0;
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
