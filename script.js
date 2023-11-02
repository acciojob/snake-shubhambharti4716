//your code here
const gameContainer = document.getElementById("gameContainer");


// render all 1600 pixels
for(let i = 1; i <= 1600; i++) {
    let pixel = document.createElement("div");
    pixel.setAttribute("id", `pixel${i}`);
    pixel.setAttribute("class", "pixel");
    gameContainer.appendChild(pixel);
}

// food
function renderFood() {

    let food = document.createElement("div");
    food.setAttribute("class", "food");
    let id = "pixel" + Math.floor(Math.random() * (1600 - 1) + 1);
    food.setAttribute("id", id);
    gameContainer.appendChild(food);
}

renderFood();