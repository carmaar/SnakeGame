let canvas = document.getElementById("game");
let context = canvas.getContext("2d");

const GRID = 16;
const SNEK_START_X = 10 * GRID;
const SNEK_START_Y = 10 * GRID;
const SNEK_START_DX = GRID;
const SNEK_START_DY = 0;
const SNEK_START_BODY_SEGMENTS = 4;
const KEY = {
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40,
	SPACE: 32
};

let foodEaten = 0;
let pause = false;
let count = 0;

let snek = {
	x: SNEK_START_X,
	y: SNEK_START_Y,

	// snek velocity. moves (1) grid length x or y
	dx: SNEK_START_DX,
	dy: SNEK_START_DY,

	// keep track of all grids snek occupies
	cells: [],

	// length of the snek
	bodySegments: SNEK_START_BODY_SEGMENTS
};

let food = {
	x: 3 * GRID,
	y: 5 * GRID
};

//  ---------------------------- FUNCTIONS ------------------------------------- 

// reassign food
function newFood() {
	food.x = getRandomInt(0, canvas.width / GRID) * GRID;
	food.y = getRandomInt(0, canvas.height / GRID) * GRID;
}

// food counter
function iterateFoodCounter() {
	foodEaten++;
	document.getElementById('foodEaten').innerHTML = 'Food eaten: ' + foodEaten;
}
// reset food
function resetFoodCounter() {
	foodEaten = 0;
	document.getElementById('foodEaten').innerHTML = 'Food eaten: ' + foodEaten;
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// animation loop
function loop() {
	requestAnimationFrame(loop);

	// slow framerate - 60 fps to 15 fps (60/15 = 4)
	if (++count < 4 || pause) {
		return;
	}

	count = 0;
	context.clearRect(0, 0, canvas.width, canvas.height);

	// velocity of snek
	snek.x += snek.dx;
	snek.y += snek.dy;

	// wrap the snek
	if (snek.x < 0) {
		snek.x += canvas.width - GRID;
	} else if (snek.x >= canvas.width) {
		snek.x = 0;
	}

	if (snek.y < 0) {
		snek.y += canvas.height - GRID;
	} else if (snek.y >= canvas.height) {
		snek.y = 0;
	}

	// keeps track of where snek has been
	snek.cells.unshift({ x: snek.x, y: snek.y });

	if (snek.cells.length > snek.bodySegments) {
		snek.cells.pop();
	}

	// draw food for snek
	context.fillStyle = "red";
	context.fillRect(food.x, food.y, GRID - 1, GRID - 1);

	// draw snek
	context.fillStyle = "white";
	snek.cells.forEach(function (cell, index) {
		context.fillRect(cell.x, cell.y, GRID - 1, GRID - 1);

		// snek eats food
		if (cell.x === food.x && cell.y === food.y) {
			snek.bodySegments++;
			iterateFoodCounter();
			console.log(":D");

			// reassign food
			newFood();

			//   // reassign food
			//   food.x = getRandomInt(0, 25) * grid;
			//   food.y = getRandomInt(0, 25) * grid;
		}

		// check for collision
		for (let i = index + 1; i < snek.cells.length; i++) {
			// restart game when snek collides with self
			if (cell.x === snek.cells[i].x && cell.y === snek.cells[i].y) {
				snek.x = SNEK_START_X;
				snek.y = SNEK_START_Y;
				snek.cells = [];
				snek.bodySegments = 4;
				snek.dx = SNEK_START_DX;
				snek.dy = SNEK_START_DY;

				console.log(":(");
				resetFoodCounter();

				// reassign food
				newFood();
			}
		}
	});
}

// controls
document.addEventListener("keydown", function (e) {
	// left
	if (e.which === KEY.LEFT && snek.dx === 0) {
		snek.dx = -GRID;
		snek.dy = 0;
	}
	// up
	else if (e.which === KEY.UP && snek.dy === 0) {
		snek.dy = -GRID;
		snek.dx = 0;
	}
	// right
	else if (e.which === KEY.RIGHT && snek.dx === 0) {
		snek.dx = GRID;
		snek.dy = 0;
	}
	// down
	else if (e.which === KEY.DOWN && snek.dy === 0) {
		snek.dy = GRID;
		snek.dx = 0;
	}
	// space
	else if (e.which === KEY.SPACE) {
		document.getElementById('title').innerHTML = pause ? 'Game on!' : 'Paused';
		pause = !pause;
		console.log('Game paused');
	}
});

// start game
requestAnimationFrame(loop);
console.log("Game started");
