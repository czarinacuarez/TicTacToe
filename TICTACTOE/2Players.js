
let update = document.getElementById("print");
update.innerHTML = "Player 1 turn.";
let Player1 = true;
let clickCount = 0;
let currentButton = document.querySelectorAll(".buttons");
let restart = document.getElementById("restart");

let winningPattern = [[0, 1, 2, 3],[4, 5, 6, 7],[8, 9, 10, 11],[12, 13, 14, 15],[0, 4, 8, 12],[1,5,9,13],[2,6,10,14],[3,7,11,15],[0,5,10,15],[3, 6, 9,12]];



const disable = () => {
	currentButton.forEach((i) => (i.disabled = true));
};

const enable = () => {
	currentButton.forEach((i) => {
    i.innerText = "";
	i.style.backgroundColor =  "rgb(255, 227, 232)";
    i.disabled = false;
  });
};

const winner = (letter) => {
  disable();
  if (letter == "X") {
    update.innerHTML = "Player 1 Wins";
  } else {
    update.innerHTML = "Player 2 Wins";
  }
};
const draw = () => {
  disable();
  update.innerHTML = "DRAW";
};

restart.addEventListener("click", () => {
  xTurn = true;
  update.innerHTML = "Player 1 turn.";
  clickCount = 0;
  enable();
});

const winChecker = () => {

	for (let i of winningPattern) {
    let [Pattern1, Pattern2, Pattern3, Pattern4] = [
		currentButton[i[0]].innerText,
		currentButton[i[1]].innerText,
		currentButton[i[2]].innerText,
		currentButton[i[3]].innerText,

    ];


    if (Pattern1 != "" && Pattern2 != "" && Pattern3 != "" && Pattern4 != "") {
      if (Pattern1 == Pattern2 && Pattern2 == Pattern3 && Pattern1 == Pattern4 && Pattern2 == Pattern4 && Pattern3 == Pattern4) {
		winner(Pattern1);
      }
    }
  }
};
currentButton.forEach((i) => {
	i.addEventListener("click", () => {
	  if (Player1) {
		Player1 = false;
		//Display X
		update.innerHTML = "Player 2 turn.";
		i.style.backgroundColor = "palevioletred";
		i.style.color = "white";
		i.innerText = "X";
		i.disabled = true;
	  } else {
		Player1 = true;
		//Display Y
		update.innerHTML = "Player 1 turn.";
		i.style.backgroundColor = "pink";
		i.style.color = "white";
		i.innerText = "O";
		i.disabled = true;
	  }
	  clickCount += 1;
	  if (clickCount == 16) {
		draw();
	  }
	  winChecker();
	});
  });

window.onload = enable;
