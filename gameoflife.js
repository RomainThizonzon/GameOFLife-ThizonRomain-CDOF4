class GameOfLife {
    constructor(rows, cols) {
      this.rows = rows;
      this.cols = cols;
      this.grid = this.createGrid();
      this.iterations = 0;
    }
  
    createGrid() {
      return Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
    }
  
    randomizeGrid() {
      this.grid = this.grid.map(row => row.map(() => (Math.random() > 0.5 ? 1 : 0)));
    }
  
    displayGrid() {
      console.clear();
      console.log(`Itération : ${this.iterations}\n`);
      this.grid.forEach(row => {
        const line = row.map(cell => (cell ? "□" : " ")).join("");
        console.log(line);
      })
    }
  
    nextGeneration() {
      const newGrid = this.createGrid();
  
      for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {
          const liveNeighbors = this.countLiveNeighbors(row, col);
  
          if (this.grid[row][col] === 1) {
            newGrid[row][col] = liveNeighbors === 2 || liveNeighbors === 3 ? 1 : 0;
          } else {
            newGrid[row][col] = liveNeighbors === 3 ? 1 : 0;
          }
        }
      }
  
      this.grid = newGrid;
      this.iterations++;
    }
  
    countLiveNeighbors(row, col) {
      let count = 0;
  
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
  
          const neighborRow = row + i;
          const neighborCol = col + j;
  
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
  
      return count;
    }
  }
  
  const game = new GameOfLife(20, 20);
  game.randomizeGrid();
  
  setInterval(() => {
    console.clear();
    game.displayGrid();
    game.nextGeneration();
  }, 700);
  