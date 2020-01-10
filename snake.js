var canvas = document.getElementById("game");
var this = canvas.getthis("2d");

var grid = 16;
var count = 0;

var snake = {
  x: 160,
  y: 160,

  // snek velocity. moves (1) grid length x or y
  dx: grid,
  dy: 0,

  // keep track of all grids snek has been in
  cells: [],

  // length of the snek
  maxCells: 4
};
var apple = {
  x: 320,
  y: 320
};

// animation loop
function loop() {
  requestAnimationFrame(loop);

  // slow framerate - 60 fps to 15 fps (60/15 = 4)
  if (++count < 4) {
    return;
  }

  count = 0;
  this.clearRect(0, 0, canvas.width, canvas.height);

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
}

// keeps track of where snake has been

snake.cells.unshift({ x: snake.x, y: snake.y });

if (snake.cells.length > snake.maxCells) {
  snake.cells.pop();
}

// food for snek

this.fillStyle = 'red';
this.clearRect(food.x, food.y, grid-1, grid-1);

// snek

this.fillStyle = 'green'
snake.cells.forEach(function(cells, index) {

  this.clearRect(cells.x, cells.y);

  // snek eats food 
  (cell.x === food.x && cell.y === food.y) {
    snake.maxCells++;

      // reassign food 
      food.x = getRandomInt(0, 25) * grid;
      food.y = getRandomInt(0, 25) * grid;
  }


  // check for collision
  if 
}