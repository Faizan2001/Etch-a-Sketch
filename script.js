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

    cell.addEventListener("mousedown", () => {
      isDrawing = true;
      cell.style.backgroundColor = selectedColor;
    });

    cell.addEventListener("mousemove", () => {
      if (isDrawing) {
        cell.style.backgroundColor = selectedColor;
      }
    });

    cell.addEventListener("touchstart", (event) => {
      event.preventDefault();
      isDrawing = true;
      cell.style.backgroundColor = selectedColor;

      // Attach touchmove and touchend listeners to the cell
      cell.addEventListener("touchmove", touchMoveHandler);
      cell.addEventListener("touchend", touchEndHandler);
    });

    function touchMoveHandler(event) {
      if (isDrawing) {
        event.preventDefault();
        const touch = event.touches[0];
        const rect = cell.getBoundingClientRect();
        if (
          touch.clientX >= rect.left &&
          touch.clientX <= rect.right &&
          touch.clientY >= rect.top &&
          touch.clientY <= rect.bottom
        ) {
          cell.style.backgroundColor = selectedColor;
        }
      }
    }

    function touchEndHandler() {
      isDrawing = false;
      // Remove touchmove and touchend listeners from the cell
      cell.removeEventListener("touchmove", touchMoveHandler);
      cell.removeEventListener("touchend", touchEndHandler);
    }

    // Add touchend event to stop drawing on touch release
    cell.addEventListener("mouseup", () => {
      isDrawing = false;
    });

    cell.addEventListener("touchend", () => {
      isDrawing = false;
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
const resetButton = document.getElementById("reset-button");
createGrid(16, 16);
let colorPicker = document.getElementById("color-picker");
const colorPickerButton = document.getElementById("color-picker-button");
let cells = document.querySelectorAll(".cell"); // Initialize the cells array here
const rainbowBtn = document.querySelector(".rainbowBtn");

rainbowBtn.addEventListener("click", () => {
  removeAllEventListeners(); // Remove previous event listeners

  cells.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      addMouseoverListeners(`rgb(
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)},
        ${Math.floor(Math.random() * 256)})`);
    });
  });
});

resetButton.addEventListener("click", () => {
  let gridSize = prompt("Enter the number of squares per side (up to 100):");
  gridSize = parseInt(gridSize);
  if (isNaN(gridSize) || gridSize < 1 || gridSize > 100) {
    alert("Please enter a valid number between 1 and 100");
    return;
  }

  clearGrid();
  createGrid(gridSize, gridSize);
  cells = document.querySelectorAll(".cell");
});

colorPickerButton.addEventListener("click", () => {
  removeAllEventListeners();

  colorPicker.click();
});

colorPicker.addEventListener("input", () => {
  const selectedColor = colorPicker.value;

  addMouseoverListeners(selectedColor);
});
