let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector(".reset");
let toggleButton = document.querySelector(".dark-toggle");
let container = document.querySelector(".container");
let main = document.querySelector("main");
let turn0 = true; // true = O's turn, false = X's turn
const winnerMsg = document.getElementById("winnerMsg");

// Dark mode toggle
let isDark = false;
toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  main.classList.toggle("dark");
  container.classList.toggle("dark");
  document.querySelector(".head").classList.toggle("dark");

  isDark = !isDark;
  toggleButton.textContent = isDark ? "Light Mode" : "Dark Mode";
});

// All 8 win conditions
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Function to check winner
const checkWin = () => {
  for (let condition of winConditions) {
    let [a, b, c] = condition;

    let val1 = boxes[a].textContent;
    let val2 = boxes[b].textContent;
    let val3 = boxes[c].textContent;

    if (val1 !== "" && val1 === val2 && val2 === val3) {
      winnerMsg.textContent = `We have a winner: ${val1}🎉`;
      winnerMsg.style.fontSize = "1.3em";
      boxes.forEach(box => box.disabled = true);
      return;
    }
  }
};

// Add click event to each box
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.textContent !== "") return; // prevent overwriting

    if (turn0) {
      box.textContent = "O";
      turn0 = false;
    } else {
      box.textContent = "X";
      turn0 = true;
    }

    box.disabled = true;
    checkWin();
  });
});

// Reset game
resetButton.addEventListener("click", () => {
  boxes.forEach(box => {
    box.textContent = "";
    box.disabled = false;
  });
  winnerMsg.textContent = "";
  turn0 = true;
});
