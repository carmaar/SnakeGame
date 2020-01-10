let canvas = document.getElementById("game");
let context = canvas.getContext("2d");

let grid = 16;
let count = 0;

let snake = {
  x: 160,
  y: 160,

  // snek velocity. moves (1) grid length x or y
  dx: grid,
  dy: 0,

  // keep track of all grids snek occupies
  cells: [],

  // length of the snek
  maxCells: 4
};
let food = {
  x: 320,
  y: 320
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// animation loop
function loop() {
  requestAnimationFrame(loop);

  // slow framerate - 60 fps to 15 fps (60/15 = 4)
  if (++count < 4) {
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  // velocity of snek
  snake.x += snake.dx;
  snake.y += snake.dy;

  // wrap the snek
  if (snake.x < 0) {
    snake.x += canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y += canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  // keeps track of where snake has been

  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // draw food for snek

  context.fillStyle = "red";
  context.fillRect(food.x, food.y, grid - 1, grid - 1);

  // draw snek

  context.fillStyle = "green";
  snake.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    // snek eats food
    if (cell.x === food.x && cell.y === food.y) {
      snake.maxCells++;
      console.log(":D");

      // reassign food
      food.x = getRandomInt(0, 25) * grid;
      food.y = getRandomInt(0, 25) * grid;
    }

    // check for collision
    for (let i = index + 1; i < snake.cells.length; i++) {
      // restart game when snek collides with self
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        snake.x = 160;
        snake.y = 160;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;

        console.log(":(");

        // reassign food
        food.x = getRandomInt(0, 25) * grid;
        food.y = getRandomInt(0, 25) * grid;
      }
    }
  });
}

// controls
document.addEventListener("keydown", function(e) {
  // left
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // up
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // right
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // down
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

// start game
requestAnimationFrame(loop);
console.log("Game started");
