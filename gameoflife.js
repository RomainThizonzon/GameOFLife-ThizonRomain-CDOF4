class GameOfLife {
  constructor(rows, cols) {
      // Initialize the grid dimensions and the grid itself
      this.rows = rows;
      this.cols = cols;
      this.grid = this.createGrid();
      this.iterations = 0; // Track the number of generations
  }

  createGrid() {
      // Create a 2D array filled with 0s (dead cells)
      return Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
  }

  randomizeGrid() {
      // Populate the grid with random 1s (alive cells) and 0s (dead cells)
      this.grid = this.grid.map(row => row.map(() => (Math.random() > 0.5 ? 1 : 0)));
  }

  displayGrid() {
      // Clear the console and display the current state of the grid
      console.clear();
      console.log(`Iteration: ${this.iterations}\n`); // Show the current iteration count
      this.grid.forEach(row => {
          // Display each row with "□" for alive cells and " " for dead cells
          const line = row.map(cell => (cell ? "□" : " ")).join("");
          console.log(line);
      });
  }

  nextGeneration() {
      // Create a new grid for the next generation
      const newGrid = this.createGrid();

      // Loop through each cell in the grid
      for (let row = 0; row < this.rows; row++) {
          for (let col = 0; col < this.cols; col++) {
              // Count the number of live neighbors for the current cell
              const liveNeighbors = this.countLiveNeighbors(row, col);

              // Apply the rules of the Game of Life
              if (this.grid[row][col] === 1) {
                  // Any live cell with 2 or 3 live neighbors survives; otherwise, it dies
                  newGrid[row][col] = liveNeighbors === 2 || liveNeighbors === 3 ? 1 : 0;
              } else {
                  // Any dead cell with exactly 3 live neighbors becomes a live cell
                  newGrid[row][col] = liveNeighbors === 3 ? 1 : 0;
              }
          }
      }

      // Update the grid and increment the iteration counter
      this.grid = newGrid;
      this.iterations++;
  }

  countLiveNeighbors(row, col) {
      // Count the number of live neighbors around the given cell
      let count = 0;

      // Iterate over the 8 possible neighbors (relative positions)
      for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
              // Skip the current cell
              if (i === 0 && j === 0) continue;

              // Calculate the neighbor's coordinates
              const neighborRow = row + i;
              const neighborCol = col + j;

              // Check if the neighbor is within bounds and alive
              if (
                  neighborRow >= 0 &&
                  neighborRow < this.rows &&
                  neighborCol >= 0 &&
                  neighborCol < this.cols &&
                  this.grid[neighborRow][neighborCol] === 1
              ) {
                  count++;
              }
          }
      }

      return count; // Return the total number of live neighbors
  }
}

// Initialize a Game of Life instance with a 20x20 grid
const game = new GameOfLife(20, 20);

// Randomly populate the grid with initial alive and dead cells
game.randomizeGrid();

// Run the game in intervals of 700ms
setInterval(() => {
  game.displayGrid(); // Display the current grid state
  game.nextGeneration(); // Calculate the next generation
}, 700);
