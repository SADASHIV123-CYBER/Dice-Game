document.addEventListener('DOMContentLoaded', function() {
    const player1 = document.getElementById('player1');
  const player2 = document.getElementById('player2');
  const NoFoRounds = document.getElementById('round');
  const rollBtn = document.getElementById('rollBtn');
  const playerOnePoints = document.getElementById('playerOnePoints');
  const playerTwoPoints = document.getElementById('playerTwoPoints');
  const diceImagesrc = document.getElementById('diceImagesrc');
  const playNextRoundbtn = document.getElementById('playNextRoundbtn');
  const playAgainBtn = document.getElementById('playAgainBtn');
  const winnerMessage = document.getElementById('winnerMessage');

  let currentPlayer = 1;
  let winner = null;
  let round = 1;
  let wins = [0, 0];

  rollBtn.addEventListener('click', rollDice);
  playAgainBtn.addEventListener('click', playAgain);
  playNextRoundbtn.addEventListener('click', playNextRound)

  function rollDice() {
    if(!winner) {
      const diceValue = Math.floor(Math.random() * 6) + 1;
      const diceImage = `./assets/dice-${diceValue}.png`;

      diceImagesrc.attributes.src.textContent = diceImage;

      if(currentPlayer === 1) {
        player1.style.backgroundColor = '#7a236075'
        player2.style.backgroundColor = '#581845'
      } else {
        player1.style.backgroundColor = '#581845'
        player2.style.backgroundColor = '#7a236075'
      }

      if (diceValue === 6) {
        winner = currentPlayer;

        winner === 2 
          ? (wins = [wins[0], wins[1] + 1]) 
          : (wins = [wins[0] + 1, wins[1]]);

        if (wins[0] >= 2 || wins[1] >= 2) return checkWinnerFun();

        if (round < 3) {

          updatePointsFun()

          winnerMessage.textContent = `player ${winner} won Round ${round} 🔥`;

          playNextRoundbtn.style.display = 'flex';
          rollBtn.style.display = 'none';

          round += 1;
        }
      }
      currentPlayer = currentPlayer === 1 ? 2 : 1;
    }
  }

  function updatePointsFun() {
    if (winner ===1) {
      playerOnePoints.children[round - 1].textContent = "✔️"
      playerTwoPoints.children[round - 1].textContent = "❌"

      playerOnePoints.children[round -1].style.backgroundColor = 'transparent';
      playerTwoPoints.children[round -1].style.backgroundColor = 'transparent';
    }

    if (winner === 2) {
      playerOnePoints.children[round - 1].textContent = "❌"
      playerTwoPoints.children[round -1].textContent = "✔️"

      playerOnePoints.children[round -1].style.backgroundColor = 'transparent';
      playerTwoPoints.children[round -1].style.backgroundColor = 'transparent';
    }
  }

  function resetPoints() {
    for(let i = 0; i < 3; i++) {
      playerOnePoints.children[i].textContent = "";
      playerTwoPoints.children[i].textContent = "";

      playerOnePoints.children[i].style.backgroundColor = "#89256b";
      playerTwoPoints.children[i].style.backgroundColor = "#89256b";

    }
  }

  function checkWinnerFun() {
    updatePointsFun();

    playAgainBtn.style.display = "flex";
    rollBtn.style.display = "none";

    if (wins[0] >= 2) {
      winnerMessage.innerHTML = `Player 1 won the game`;
    } else if (wins[1] >= 2) {
      winnerMessage.innerHTML = `Player 2 won the game`;
    }
  }

  function playNextRound() {
    NoFoRounds.textContent = " " + round;

    winner = null;

    playNextRoundbtn.style.display = "none";
    rollBtn.style.display = "flex";

    winnerMessage.textContent = "";
  }

  function playAgain() {

    winner = null;

    playAgainBtn.style.display = "none";
    rollBtn.style.display = "flex";

    currentPlayer = 1;

    wins = [0, 0];

    round = 1;

    NoFoRounds.textContent = "" + round;

    resetPoints();

  }
})