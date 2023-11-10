// This file is not to be modified. Please ignore this.
// We will understand all of this later in the course.
// DO NOT MODIFY THIS FILE

const gameContainer = document.getElementById("gameContainer");
    const scoreElement = document.getElementById("score");

    const gridSize = 40;
    const pixelSize = 10;
    const snakeSpeed = 100; // milliseconds
    let snakeDirection = "right";
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
      const head = Object.assign({}, snake[0]);

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
      snakeDirection = "right";
      score = 0;
      scoreElement.textContent = score;
      generateFood();
      renderGame();
    }

    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          if (snakeDirection !== "down") {
            snakeDirection = "up";
          }
          break;
        case "ArrowDown":
          if (snakeDirection !== "up") {
            snakeDirection = "down";
          }
          break;
        case "ArrowLeft":
          if (snakeDirection !== "right") {
            snakeDirection = "left";
          }
          break;
        case "ArrowRight":
          if (snakeDirection !== "left") {
            snakeDirection = "right";
          }
          break;
      }
    });

    generateFood();
    renderGame();
    setInterval(moveSnake, snakeSpeed);