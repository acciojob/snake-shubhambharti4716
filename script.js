const gameContainer = document.getElementById("gameContainer");
const scoreElement = document.getElementById("score");

const gridSize = 40;
const snakeSpeed = 100; // milliseconds
let snakeDirection = "up";
let snake = [{ row: 20, col: 1 }];
let food = { row: 0, col: 0 };
let score = 0;

function createPixel(id, className) {
  const pixel = document.createElement("div");
  pixel.className = `pixel ${className}`;
  pixel.id = `pixel${id}`;
  return pixel;
}

function renderGame() {
  gameContainer.innerHTML = "";

  for (let row = 1; row <= gridSize; row++) {
    for (let col = 1; col <= gridSize; col++) {
      const pixelId = (row - 1) * gridSize + col;
      const pixel = createPixel(pixelId, "");
      gameContainer.appendChild(pixel);
    }
  }

  snake.forEach((pixel) => {
    const pixelId = (pixel.row - 1) * gridSize + pixel.col;
    const snakePixel = createPixel(pixelId, "snakeBodyPixel");
    gameContainer.appendChild(snakePixel);
  });

  const foodPixelId = (food.row - 1) * gridSize + food.col;
  const foodPixel = createPixel(foodPixelId, "food");
  gameContainer.appendChild(foodPixel);
}

function moveSnake() {
  const head = { ...snake[0] };

  switch (snakeDirection) {
    case "up":
      head.row--;
      break;
    case "down":
      head.row++;
      break;
    case "left":
      head.col--;
      break;
    case "right":
      head.col++;
      break;
  }

  snake.unshift(head);

  if (head.row === food.row && head.col === food.col) {
    // Snake ate the food
    score++;
    scoreElement.textContent = score;
    generateFood();
  } else {
    snake.pop();
  }

  renderGame();

  // Check for collisions
  if (
    head.row < 1 ||
    head.row > gridSize ||
    head.col < 1 ||
    head.col > gridSize ||
    checkCollision()
  ) {
    alert("Game Over!");
    resetGame();
  }
}

function generateFood() {
  food = {
    row: Math.floor(Math.random() * gridSize) + 1,
    col: Math.floor(Math.random() * gridSize) + 1,
  };

  // Regenerate food if it's on the snake
  while (checkCollision()) {
    food = {
      row: Math.floor(Math.random() * gridSize) + 1,
      col: Math.floor(Math.random() * gridSize) + 1,
    };
  }
}

function checkCollision() {
  return snake.some(
    (pixel) => pixel.row === food.row && pixel.col === food.col
  );
}

function resetGame() {
  snake = [{ row: 20, col: 1 }];
  snakeDirection = "up";
  score = 0;
  scoreElement.textContent = score;
  generateFood();
  renderGame();
}

generateFood();
renderGame();
setInterval(moveSnake, snakeSpeed);

function waitForElement(selector, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    function checkElement() {
      const element = document.querySelector(selector);

      if (element) {
        resolve(element);
      } else if (Date.now() - startTime > timeout) {
        reject(new Error(`Timeout waiting for element with selector: ${selector}`));
      } else {
        setTimeout(checkElement, 100);
      }
    }

    checkElement();
  });
}


waitForElement('#pointsEarned')
  .then((element) => {
    // The element is found, now make an assertion
    const pointsEarned = element.textContent;
    if (pointsEarned === '0') {
      console.log('Assertion passed: pointsEarned contains "0"');
    } else {
      console.error('Assertion failed: pointsEarned does not contain "0"');
    }
  })
  .catch((error) => {
    console.error(error.message);
    // Handle the error (e.g., show an error message or fail the test)
  });

setTimeout(() => {
  // Make the assertion after waiting for 5 seconds
  const snakeBodyPixels = document.querySelectorAll('.snakeBodyPixel');
  const snakeLength = snakeBodyPixels.length;

  if (snakeLength === 2) {
    console.log('Assertion passed: There are 2 snake body pixels.');
  } else {
    console.error(`Assertion failed: Found ${snakeLength} snake body pixels, expected 2.`);
  }
}, 5000);