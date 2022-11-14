const startGame = document.getElementById("id-startGameBtn");

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_CHOICE = ROCK;

const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WIN = 'PLAYER_WIN';
const RESULT_COMPUTER_WIN = 'COMPUTER_WIN';

let gameIsRunning = false;
let logEntries = [];
let lastInfo; // falsy

const writeToLog = (ev, computer, player, winner) => {
  const logEntry = {
    event: ev,
    computer_choice: computer,
    player_choice: player,
    result: winner
  };
  logEntries.push(logEntry);
}

const showLog = () => {
  for (let i = 0; i < 3; i++) {
    console.log('----------------------');
  }
 
  let j = 1;
  for (const info of logEntries) {
    if (!lastInfo && lastInfo !== 0 || lastInfo < j) {
      console.log(`#${j}`);
      for (const key in info) {
        console.log(`${key} => ${info[key]}`);
      }
      lastInfo = j;
      break;
    }
    j++;
  }
}

const playerChoice = () => { // anonymous function
  const selection = prompt('Rock, Paper or Scissors', '').toUpperCase();
  if (selection !== ROCK &&
      selection !== PAPER &&
      selection !== SCISSORS) {
       alert ('Invalid choice! we choose "Rock" for you');
       return;
     }
     return selection;
}

const computerChoice = () => { // anonymous function
   const cChoice = Math.random(); // throw number from 0-1
   if (cChoice < 0.34) {
     return ROCK;
   } else if (cChoice < 0.67) {
     return PAPER;
   } else {
     return SCISSORS;
   }
}

const calcGame = (computer, player = DEFAULT_CHOICE) => {
  if(computer === player) {
    return RESULT_DRAW;
  } 
  else if (player === ROCK && computer === SCISSORS ||
      player === PAPER && computer === ROCK ||
      player === SCISSORS && computer === PAPER) {
        return RESULT_PLAYER_WIN;
      } 
  else {
    return RESULT_COMPUTER_WIN;
  }
}

startGame.addEventListener('click', () => {  
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  const playerSelect = playerChoice();
  const computerSelect = computerChoice();
  let winner;
  if (playerSelect) {
    winner = calcGame(computerSelect, playerSelect);
  } else {
    winner = calcGame(computerSelect);
  }
  let messageGame = `You => ${playerSelect || DEFAULT_CHOICE}\nComputer => ${computerSelect}\nYou `;
  if (winner === RESULT_DRAW) {
    messageGame += 'have a Draw!';
  } else if (winner === RESULT_PLAYER_WIN) {
    messageGame += 'WON!';
  } else {
    messageGame += 'LOSE!';
  }
  writeToLog('Game is running...', computerSelect, (playerSelect || DEFAULT_CHOICE), winner);
  showLog();
  alert(messageGame);
  gameIsRunning = false;
 }
);
