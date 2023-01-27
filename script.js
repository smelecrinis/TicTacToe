const XClass = "x";
const CircleClass = "circle";
const WinningCombinations = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6] 
];
const status = document.getElementById('currentStatus');
const currentTurnImg = document.getElementById ('currentImg');
const restartButton = document.getElementById('restartButton');
const board = document.getElementById('board');
const cellElements = document.querySelectorAll('[data-cell]');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text] p');
const winningMessageImg = document.createElement('img');
const quitBtn = document.getElementById('quit');
const nextBtn = document.getElementById('next');
const xScore = document.getElementById ('xCounter');
const drawScore = document.getElementById ('drawCounter');
const circleScore = document.getElementById ('circleCounter');
let xCounter = 0;
let circleCounter = 0;
let drawCounter = 0;
let circleTurn


const setBoardHoverClass = () => {
    board.classList.remove(XClass);
    board.classList.remove(CircleClass);
    if (circleTurn) {
        board.classList.add(CircleClass);
    } else {
        board.classList.add(XClass);
    }
}

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass);
}

const swapTurns = () => {
    circleTurn = !circleTurn;
    if (circleTurn) {
        currentTurnImg.src = './img/circle-dot-solid.svg';
        currentTurnImg.alt = 'circle icon';
    } else {
        currentTurnImg.src = './img/x-mark.svg';
        currentTurnImg.alt = 'x icon';
    }
}

const checkWin = (currentClass) => {
    return WinningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

const isDraw = () => {
    return [...cellElements].every(cell => {
        return cell.classList.contains(XClass) || cell.classList.contains(CircleClass);
    })
}

const startGame = () => {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(XClass)
        cell.classList.remove(CircleClass)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')    
}

const endGame = (draw) => {
    if (draw) {
    drawCounter++;
    winningMessageImg.remove();
    winningMessageTextElement.innerText = "Draw!";           
    } else {
        winningMessageImg.src = circleTurn ? './img/circle-dot-solid.svg' : './img/x-mark.svg';
        winningMessageImg.alt = circleTurn ? 'circle image' : 'x image';
        winningMessageImg.classList.add('win-icon');
        winningMessageTextElement.insertAdjacentElement("beforebegin", winningMessageImg);
        winningMessageTextElement.innerText = `takes the round!`
        if (circleTurn) {
            circleCounter++;            
        } else {
            xCounter++;            
        }        
    }
    winningMessageElement.classList.add("show");
    updateScore();
}

const handleClick = (e) => {
    const cell = e.target
    const currentClass = circleTurn ? CircleClass : XClass
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
    endGame(false)
    } else if (isDraw()){
    endGame(true)
    } else { 
    swapTurns();
    setBoardHoverClass();
    }
}

const updateScore = () => {
    drawScore.innerText = drawCounter; 
    circleScore.innerText = circleCounter;
    xScore.innerText = xCounter;
}

const quitGame = () => {
    xCounter = 0;
    circleCounter = 0;
    drawCounter = 0;
    updateScore();
    startGame();
}

restartButton.addEventListener('click', startGame);
quitBtn.addEventListener('click', quitGame);
nextBtn.addEventListener('click', startGame);

startGame();

