{
  let isDrawing = true;
  let gameStarted = false;
  let x = 720;
  let y = 20;
  let count = 0;
  let timeout;
  let rectangle = new Path2D();
  let circle = new Path2D();

  const $canvas = document.querySelector(`#canvas`);
  const ctx = $canvas.getContext(`2d`);
  const $counter = document.querySelector(`.counter__number`);
  const $restartButton = document.querySelector(`.game__restart`);
  const $cursor = document.querySelector(`.cursor`);

  $canvas.addEventListener(`mousemove`, e => {
    if (isDrawing === true && gameStarted === true) {
      drawLine(ctx, x, y, e.offsetX, e.offsetY);
      x = e.offsetX;
      y = e.offsetY;
    }
    if (ctx.isPointInPath(rectangle, e.offsetX, e.offsetY) && gameStarted === true) {
      document.querySelector(`.game__remark`).textContent = 'auwch you hit the walls...'
      gameResult();
    }
    if (ctx.isPointInPath(circle, e.offsetX, e.offsetY) && gameStarted === true) {
      document.querySelector(`.game__remark`).textContent = `you've reached the finish!!!`
      gameResult();
    }
    if (gameStarted === true) {
      $cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;")
      $cursor.style.cursor = 'none';
      $cursor.style.display = 'block';
    } else {
      clearTimeout(timeout);
    }

  });

  const handleMouseDown = () => {
    if (gameStarted === true) {
      let randomColor = 'rgb(' + random(255) + ',' + random(255) + ',' + random(255) + ')';
      $canvas.style.background = randomColor;
      count += 1;
      $counter.innerHTML = count;
    }
  };

  const handleClick = e => {
    e.preventDefault();
    location.reload();
  }

  let seconds = 20;
  const startGame = () => {
    seconds--;
    if (seconds === 0) {
      gameStarted = false
      document.querySelector(`.timer__number`).innerHTML = seconds;
      document.querySelector(`.game__remark`).textContent = `Too slow...`;
      gameResult();
    } else {
      document.querySelector(`.timer__number`).innerHTML = seconds + " seconds";
    }
    timeout = setTimeout(() => {
      if (seconds > 0) {
        startGame();
      }
    }, 1000);
  }

  const gameResult = () => {
    const $results = document.querySelector(`.results__list`);
    let results = $counter;

    const $li = document.createElement('li');
    $li.textContent = results.textContent;
    $results.appendChild($li);
    gameStarted = false;
  }

  const random = n => {
    return Math.floor(Math.random() * (n + 1));
  }

  const drawLine = (ctx, x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.strokeStyle = `white`;
    ctx.lineWidth = 2;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
  }

  rectangle.rect(0, 0, 40, 600);
  rectangle.rect(0, 640, 40, 80);
  rectangle.rect(360, 0, 40, 200);
  rectangle.rect(280, 80, 40, 200);
  rectangle.rect(480, 40, 40, 160);
  rectangle.rect(560, 0, 40, 200);
  rectangle.rect(640, 40, 40, 200);
  rectangle.rect(160, 280, 40, 120);
  rectangle.rect(480, 320, 40, 80);
  rectangle.rect(240, 360, 40, 160);
  rectangle.rect(680, 480, 40, 240);
  rectangle.rect(80, 560, 40, 160);
  rectangle.rect(600, 480, 40, 160);
  rectangle.rect(160, 520, 40, 80);
  rectangle.rect(240, 520, 40, 80);

  rectangle.rect(0, 0, 400, 40);
  rectangle.rect(80, 80, 240, 40);
  rectangle.rect(80, 160, 160, 40);
  rectangle.rect(80, 240, 600, 40);
  rectangle.rect(40, 320, 80, 40);
  rectangle.rect(80, 400, 120, 40);
  rectangle.rect(120, 640, 520, 40);
  rectangle.rect(40, 480, 200, 40);
  rectangle.rect(320, 440, 200, 80);
  rectangle.rect(560, 320, 160, 40);
  rectangle.rect(480, 400, 200, 40);
  rectangle.rect(240, 320, 200, 40);
  rectangle.rect(280, 560, 160, 40);
  rectangle.rect(480, 560, 80, 40);

  rectangle.rect(680, 120, 40, 40);
  rectangle.rect(400, 160, 40, 40);
  rectangle.rect(440, 40, 40, 40);
  rectangle.rect(400, 360, 40, 40);
  rectangle.rect(320, 400, 40, 40);
  rectangle.rect(560, 480, 40, 40);

  circle.arc(60, 720, 20, 0, Math.PI, true);

  ctx.fillStyle = 'black'
  ctx.fill(rectangle);
  ctx.font = "15px Helvetica"
  ctx.fillText("START =>", 640, 25);
  ctx.fillStyle = 'green'
  ctx.fill(circle);

  const init = () => {
    $cursor.addEventListener(`mousedown`, handleMouseDown);
    $restartButton.addEventListener(`click`, handleClick);
    setTimeout(() => {
      startGame();
      gameStarted = true;
    }, 1000);
  };

  init();
} 
