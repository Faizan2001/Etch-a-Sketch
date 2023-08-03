function createGrid(rows, columns) {
  const cellSize = `${100 / columns}%`;

  for (let i = 0; i < rows * columns; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.flexBasis = cellSize;
    container.appendChild(cell);
  }
}

function clearGrid() {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function initSketchpad(row, column) {
  createGrid(row, column);

  const colorPicker = document.getElementById("color-picker");
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      const selectedColor = colorPicker.value;
      cell.style.backgroundColor = selectedColor;
    });
  });
}

// Body of the code below

const container = document.querySelector(".container");
initSketchpad(16,16);

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  let gridSize = prompt("Enter the number of squares per side (up to 100):");
  gridSize = parseInt(gridSize);
  if (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
    alert("Please enter a valid number between 1 and 100");
    return;
  }

  clearGrid();
  initSketchpad(gridSize,gridSize)
});
