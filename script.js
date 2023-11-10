//your code here
document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.getElementById("gameContainer");
  const scoreElement = document.getElementById("score");

  const gridSize = 40;
  const initialSnakeSpeed = 100; // in ms
  const initialSnakePosition = { row: 20, col: 1 };
  const initialDirection = "right";

  let snake = [initialSnakePosition];
  let direction = initialDirection;
  let foodPosition = generateRandomPosition();
  let score = 0;
  let snakeSpeed = initialSnakeSpeed;
  let gameInterval;

  // Initialize the game grid
  for (let i = 0; i < gridSize * gridSize; i++) {
    const pixel = document.createElement("div");
    pixel.className = "pixel";
    gameContainer.appendChild(pixel);
  }

  // Helper function to generate a random position
  function generateRandomPosition() {
    const row = Math.floor(Math.random() * gridSize) + 1;
    const col = Math.floor(Math.random() * gridSize) + 1;
    return { row, col };
  }

  // Helper function to check if two positions are the same
  function positionsAreEqual(pos1, pos2) {
    return pos1.row === pos2.row && pos1.col === pos2.col;
  }

  // Update the game grid
  function updateGrid() {
    // Clear the grid
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel) => (pixel.className = "pixel"));

    // Place food
    const foodPixel = document.querySelector(`#pixel-${foodPosition.row}-${foodPosition.col}`);
    foodPixel.className = "food";

    // Place the snake
    snake.forEach((segment, index) => {
      const snakePixel = document.querySelector(`#pixel-${segment.row}-${segment.col}`);
      snakePixel.className = index === 0 ? "snakeHead" : "snakeBodyPixel";
    });
  }

  // Handle user input
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        if (direction !== "down") direction = "up";
        break;
      case "ArrowDown":
        if (direction !== "up") direction = "down";
        break;
      case "ArrowLeft":
        if (direction !== "right") direction = "left";
        break;
      case "ArrowRight":
        if (direction !== "left") direction = "right";
        break;
    }
  });

  // Start the game loop
  function startGame() {
    gameInterval = setInterval(() => {
      // Move the snake
      let newHead;
      switch (direction) {
        case "up":
          newHead = { row: snake[0].row - 1, col: snake[0].col };
          break;
        case "down":
          newHead = { row: snake[0].row + 1, col: snake[0].col };
          break;
        case "left":
          newHead = { row: snake[0].row, col: snake[0].col - 1 };
          break;
        case "right":
          newHead = { row: snake[0].row, col: snake[0].col + 1 };
          break;
      }

      // Check for collisions with the wall or itself
      if (
        newHead.row < 1 ||
        newHead.row > gridSize ||
        newHead.col < 1 ||
        newHead.col > gridSize ||
        snake.some((segment) => positionsAreEqual(segment, newHead))
      ) {
        clearInterval(gameInterval);
        alert("Game Over! Your score: " + score);
        return;
      }

      // Check if the snake eats the food
      if (positionsAreEqual(newHead, foodPosition)) {
        // Increase the score
        score += 10;
        scoreElement.innerText = score;

        // Generate new food position
        foodPosition = generateRandomPosition();

        // Increase snake speed slightly
        snakeSpeed *= 0.9;
        clearInterval(gameInterval);
        gameInterval = setInterval(startGame, snakeSpeed);
      } else {
        // Remove the tail of the snake
        snake.pop();
      }

      // Move the snake
      snake.unshift(newHead);

      // Update the game grid
      updateGrid();
    }, snakeSpeed);
  }

  // Start the game
  startGame();
});