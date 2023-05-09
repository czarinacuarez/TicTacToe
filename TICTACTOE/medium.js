let Xturn = true;
let player1 = 'X';
let computer = 'O';
let update = document.getElementById("print");
let currentButton = document.querySelectorAll(".buttons");
var playerCount = 0;
var a = 0;
var bet = [];
let comp = 1;


for (var i = 0; i < 4; i++) {
  for (var j = 0; j < 4; j++) {
    bet[i] = [];
  }
}

var currentRecord = [
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
  ["", "", "", ""],
];


const disable = () => {
	currentButton.forEach((i) => (i.disabled = true));
};

const enable = () => {
	currentButton.forEach((i) => {
    i.innerHTML = "";
	i.style.backgroundColor =  "rgb(255, 227, 232)";
    i.disabled = false;
  });
};


for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    bet[i][j] = currentButton[a++];
  }
}


function gameUpdate() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      currentRecord[i][j] = bet[i][j].innerHTML;
    }
  }
}

start();

function start() {
  currentEmptyGrid().forEach((element) => {
    element.addEventListener("click", playerMove);
  });

  if (Xturn == false) {
    moveAI();
  } else {
    Xturn = true;
    update.innerHTML = "Player 1 turn.";
  }
}

function nextPlayer() {
  gameUpdate();
  
  if (checkWinner() == null) {
    if (Xturn == false) {

      currentEmptyGrid().forEach((element) => {
        element.classList.add("field");
      });

      Xturn = true;

      update.innerHTML = "Player 1 turn.";
    } else {
      moveAI();
    }

  } else if (checkWinner() == computer) {update.innerHTML = "Computer Wins"; disable();
  } else if (checkWinner() == player1) { update.innerHTML = "Player 1 Wins"; disable();} 
  else { update.innerHTML = "Tie"; disable();}
}



function moveAI() {
  Xturn = false;
  update.innerHTML = "Computer turn.";

  currentButton.forEach((element) => {
    element.classList.remove("field");
  });

  if (comp = 1){
    window.setTimeout(()=>{ computerMove();
    },1000);
  } else{
    window.setTimeout(()=>{ computerRandom();
    },1000);
  }

}



const updateComputer = () => {
	currentButton.forEach((i) => {

    if (i.innerHTML == computer){
      i.style.backgroundColor = "pink";
      i.style.color = "white";
      i.innerText = "O";
    }
    
  });
};


function checkNextHumanMove() {
  
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      
      if (currentRecord[i][j] == "") {
        currentRecord[i][j] = computer;
       
        if (checkWinner() == computer) {
          
          bet[i][j].innerHTML = computer;
          
          return true;
        }
        currentRecord[i][j] = player1;
        if(checkWinner() == player1){
          
          bet[i][j].innerHTML = computer;
          return true;
        }
        currentRecord[i][j] = "";
        
      }
    }
  }
  return false;
}

function equals4(Pattern1, Pattern2, Pattern3, Pattern4) {
  return Pattern1 == Pattern2 && Pattern2 == Pattern3 && Pattern1 == Pattern4 && Pattern2 == Pattern4 && Pattern3 == Pattern4 && Pattern1!= "";
}

function checkWinner() {
  var winner = null;
  for (let i = 0; i < 4; i++) {
    if ( equals4(currentRecord[i][0],currentRecord[i][1],currentRecord[i][2],currentRecord[i][3]
      )
    ) {
      return currentRecord[i][0];
    }
  }
  for (let i = 0; i < 4; i++) {
    if (equals4(currentRecord[0][i], currentRecord[1][i],currentRecord[2][i], currentRecord[3][i])) {
      return currentRecord[0][i];
    }
  }
  if (
    equals4(currentRecord[0][0], currentRecord[1][1], currentRecord[2][2], currentRecord[3][3])
  ) {
    return currentRecord[0][0];
  }
  if (
    equals4(currentRecord[0][3], currentRecord[1][2], currentRecord[2][1], currentRecord[3][0])
  ) {
    return currentRecord[0][3];
  }
  if (winner == null && currentEmptyGrid().length == 0) {
    return "draw";
  } else {
    return winner;
  }
}

function currentEmptyGrid() {
  var empty = [];
  for (let i = 0; i < 16; i++) {
    if (currentButton[i].innerHTML == "") {empty.push(currentButton[i]);}}
    return empty;
}
function computerRandom(){
    comp = 1;
    bet[Math.floor(Math.random() * emptyFields.length)].innerHTML = computer;
    nextPlayer();

}
function computerMove() {
    comp =  0;
  if (playerCount >= 3) {
    if (checkNextHumanMove()) {
      updateComputer();
      nextPlayer();
    }else{
      currentEmptyGrid()[0].innerHTML = computer;
      updateComputer();
      nextPlayer();
    }
  } else {
    currentEmptyGrid()[0].innerHTML = computer;
    updateComputer();

    nextPlayer();
  }
}


function playerMove(i) {
  if (Xturn = true && i.target.innerHTML == "") {
    i.target.innerHTML = player1;
    i.target.style.backgroundColor = "palevioletred";
    i.target.style.color = "white";
    playerCount++;
    nextPlayer();
    
  }
}
