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
	x: 320,
	y: 320
};

// reassign food
function newFood() {
	food.x = getRandomInt(0, 25) * GRID;
	food.y = getRandomInt(0, 25) * GRID;
}

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
				snek.x = 160;
				snek.y = 160;
				snek.cells = [];
				snek.bodySegments = 4;
				snek.dx = GRID;
				snek.dy = 0;

				console.log(":(");

				// reassign food
				newFood();
			}
		}
	});
}

// controls
document.addEventListener("keydown", function (e) {
	// left
	if (e.which === 37 && snek.dx === 0) {
		snek.dx = -GRID;
		snek.dy = 0;
	}
	// up
	else if (e.which === 38 && snek.dy === 0) {
		snek.dy = -GRID;
		snek.dx = 0;
	}
	// right
	else if (e.which === 39 && snek.dx === 0) {
		snek.dx = GRID;
		snek.dy = 0;
	}
	// down
	else if (e.which === 40 && snek.dy === 0) {
		snek.dy = GRID;
		snek.dx = 0;
	}
});

// start game
requestAnimationFrame(loop);
console.log("Game started");
