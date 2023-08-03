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



function addMouseoverListeners(selectedColor) {
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      cell.style.backgroundColor = selectedColor;
    });
  });
}

function removeAllEventListeners() {
  cells.forEach((cell) => {
    const newCell = cell.cloneNode(true);
    cell.parentNode.replaceChild(newCell, cell);
  });
  cells = document.querySelectorAll(".cell");
}

// Body of the code below

const container = document.querySelector(".container");
createGrid(16, 16);

let cells = document.querySelectorAll(".cell"); // Initialize the cells array here

const rainbowBtn = document.querySelector(".rainbowBtn");
rainbowBtn.addEventListener("click", () => {
  removeAllEventListeners(); // Remove previous event listeners

  cells = document.querySelectorAll(".cell"); // Update the cells array with new cells
  cells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      addMouseoverListeners(`rgb(
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)})`);
    });
  });
});

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  let gridSize = prompt("Enter the number of squares per side (up to 100):");
  gridSize = parseInt(gridSize);
  if (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
    alert("Please enter a valid number between 1 and 100");
    return;
  }

  clearGrid();
  createGrid(gridSize, gridSize);

  
 
});

const colorPickerButton = document.getElementById("color-picker-button");
const colorPicker = document.getElementById("color-picker");

colorPickerButton.addEventListener("click", () => {
  removeAllEventListeners();

  colorPicker.click();
});

colorPicker.addEventListener("input", () => {
  const selectedColor = colorPicker.value;

  removeAllEventListeners(); // Remove previous event listeners
  addMouseoverListeners(selectedColor);
});
