let boxes= document.querySelectorAll(".box");
let resetBtn= document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
const choice = document.querySelector('.choice-div');
const playerX = document.querySelector('#playerX');
const playerO = document.querySelector('#playerO')


let player = 'X';
let isPauseGame = false;
let isGameStart = false;

const inputCells = ['', '', '',
                    '', '', '',
                    '', '', '',
]

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box,index) => {
    box.addEventListener("click", ()=>{
       if(box.textContent == '' && !isPauseGame){
        isGameStart =true;
        updateCell(box,index)
    
        if(!checkWinner()){
        changePlayer()
        randomPick()
        }
        count ++;
       }
        
    }
    );
}
);

function changePlayer(){
    player = (player == 'X') ? 'O' : 'X'
}

function updateCell(box,index) {
    box.textContent = player;
    inputCells[index] = player;
    box.style.color= (player == 'X') ? '#8DA432' : '#EDE383';
}

const gameDraw = () => {
    msg.innerText= `Game was a Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText= "";
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${player}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(const [a,b,c] of winPatterns){
      if(inputCells[a]== player &&
        inputCells[b] == player &&
        inputCells[c] == player
      ){
        showWinner([a,b,c])
        return true
      }
    }
 
    if(inputCells.every(box => box != '')){
        gameDraw()
        return true
    }
};

function choosePlayer(selectedPlayer) {
    if(!isGameStart){
        player = selectedPlayer
        if (player == 'X'){
            playerX.classList.add('player-active')
            playerO.classList.remove('player-active')
        }
        else{
            playerX.classList.remove('player-active')
            playerO.classList.add('player-active')
        }
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

