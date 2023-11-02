const gameContainer = document.getElementById('gameContainer');
let score = 0;
let snakeLength = 1;

// Create the game board
for (let i = 0; i < 1600; i++) {
  let pixel = document.createElement('div');
  pixel.classList.add('gameBoardPixel');
  pixel.setAttribute('id', `pixel${i}`);
  gameContainer.appendChild(pixel);
}

// Initialize the snake
let snake = [799];
let direction = 'right';

// Create food at a random position
function createFood() {
  let foodIndex = Math.floor(Math.random() * 1600);
  let foodPixel = document.getElementById(`pixel${foodIndex}`);
  if (!foodPixel.classList.contains('snakeBodyPixel')) {
    foodPixel.classList.add('food');
  } else {
    createFood();
  }
}

// Check if the snake eats the food
function eatFood() {
  let head = document.getElementById(`pixel${snake[snake.length - 1]}`);
  if (head.classList.contains('food')) {
    head.classList.remove('food');
    score++;
    snakeLength++;
    document.getElementById('score').textContent = score;
    createFood();
  }
}

// Move the snake on the board
function moveSnake() {
  let head = snake[snake.length - 1];
  let tail = snake[0];
  let next;

  switch (direction) {
    case 'up':
      next = head - 40 < 0 ? head + 1560 : head - 40;
      break;
    case 'down':
      next = (head + 40) % 1600;
      break;
    case 'left':
      next = head % 40 === 0 ? head + 39 : head - 1;
      break;
    case 'right':
      next = (head + 1) % 40 === 0 ? head - 39 : head + 1;
      break;
  }

  let nextPixel = document.getElementById(`pixel${next}`);

  if (nextPixel.classList.contains('snakeBodyPixel')) {
    clearInterval(interval);
    alert(`Game Over! Your score is ${score}`);
  }

  nextPixel.classList.add('snakeBodyPixel');
  snake.push(next);

  if (snake.length > snakeLength) {
    document.getElementById(`pixel${tail}`).classList.remove('snakeBodyPixel');
    snake.shift();
  }

  eatFood();
}

createFood();
let interval = setInterval(moveSnake, 100);

// Add event listener for arrow key presses
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
  }
});
