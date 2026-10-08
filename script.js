let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
const playerX = document.querySelector('#playerX');
const playerO = document.querySelector('#playerO');

let startPlayer = sessionStorage.getItem('startPlayer') || 'X';
let player = startPlayer;
let inputCells = Array(9).fill('');

const winPatterns = [
  [0,1,2],[0,3,6],[0,4,8],[1,4,7],
  [2,5,8],[2,4,6],[3,4,5],[6,7,8]
];

// ---------- choice page (index.html) ----------
function choosePlayer(selected) {
  startPlayer = selected;
  player = selected;
  sessionStorage.setItem('startPlayer', selected);
  playerX.classList.toggle('player-active', selected === 'X');
  playerO.classList.toggle('player-active', selected === 'O');
}
if (playerX && playerO) choosePlayer(startPlayer);

// ---------- game page (page2.html) ----------
const disableBoxes = () => boxes.forEach(b => b.disabled = true);

const enableBoxes = () => boxes.forEach(b => {
  b.disabled = false;
  b.textContent = "";
});

const resetGame = () => {
  inputCells = Array(9).fill('');
  player = startPlayer;
  enableBoxes();
  msgContainer.classList.add("hide");
};

const showWinner = () => {
  msg.innerText = `Congratulations, winner is ${player}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const gameDraw = () => {
  msg.innerText = "Game was a Draw";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (const [a, b, c] of winPatterns) {
    if (inputCells[a] === player && inputCells[b] === player && inputCells[c] === player) {
      showWinner();
      return true;
    }
  }
  if (inputCells.every(cell => cell !== '')) {
    gameDraw();
    return true;
  }
  return false;
};

function changePlayer() {
  player = (player === 'X') ? 'O' : 'X';
}

function updateCell(box, index) {
  box.textContent = player;
  inputCells[index] = player;
  box.style.color = (player === 'X') ? '#8DA432' : '#EDE383';
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (box.textContent === '') {
      updateCell(box, index);
      if (!checkWinner()) changePlayer();
    }
  });
});

if (newGameBtn) newGameBtn.addEventListener("click", resetGame);
if (resetBtn) resetBtn.addEventListener("click", resetGame);