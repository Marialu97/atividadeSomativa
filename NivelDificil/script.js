
/* Seleção de elementos do html */
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const continueButton = document.querySelector("[data-continue-button]");
const restartButton = document.querySelector("[data-restart-button]");
const xScoreElement = document.getElementById("x-score"); // Elemento para mostrar os pontos de X
const circleScoreElement = document.getElementById("circle-score"); // Elemento para mostrar os pontos de Círculo

let isCircleTurn = false; // Declarar a variável isCircleTurn
let xPoints = 0;
let circlePoints = 0;

/* Atualizar a exibição dos pontos */
const updateScoreboard = () => {
  xScoreElement.innerText = xPoints;
  circleScoreElement.innerText = circlePoints;
};

/* Finalizar o jogo e atualizar os pontos */
const endGame = (isDraw) => {
  if (isDraw) {
    winningMessageTextElement.innerText = "Empate!";
  } else {
    // Verificar quem venceu e atualizar os pontos
    if (isCircleTurn) {
      circlePoints++; // Marca ponto para o Círculo
      winningMessageTextElement.innerText = "Círculo Venceu!";
    } else {
      xPoints++; // Marca ponto para o X
      winningMessageTextElement.innerText = "X Venceu!";
    }
  }

  // Atualizar a pontuação na tela
  updateScoreboard();

  // Verificar se alguém atingiu 3 pontos
  if (xPoints === 3 || circlePoints === 3) {
    winningMessageTextElement.innerText = `${isCircleTurn ? "Círculo" : "X"} é o melhor jogador!`;

    // Mostrar mensagem de vitória
    setTimeout(() => {
      winningMessage.classList.add("show-winning-message");
      restartButton.style.display = "block"; // Mostrar o botão de reiniciar
    }, 1000); // Atrasar um pouco para mostrar a mensagem de vitória
  } else {
    // Caso ninguém tenha 3 pontos, mostra o botão de continuar a partida
    setTimeout(() => {
      winningMessage.classList.add("show-winning-message");
      continueButton.style.display = "block"; // Mostrar o botão de continuar
    }, 1000);
  }
};

/* Reiniciar jogo e zerar pontos somente após 3 pontos */
const startGame = () => {
  isCircleTurn = false;

  // Resetar o estado do jogo
  cellElements.forEach((cell) => {
    cell.classList.remove("circle", "x");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });

  setBoardHoverClass();
  winningMessage.classList.remove("show-winning-message"); // Esconder mensagem
  continueButton.style.display = "none"; // Esconder botão de continuar
  restartButton.style.display = "none"; // Esconder botão de reiniciar
};

/* Verificar vitória */
const checkForWin = (currentPlayer) => {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6], // Diagonal
  ];

  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

/* Verificar empate */
const checkForDraw = () => {
  return [...cellElements].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

/* Adicionar símbolo à célula */
const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

/* Configurar a classe do board para mostrar quem joga */
const setBoardHoverClass = () => {
  board.classList.remove("circle", "x");
  board.classList.add(isCircleTurn ? "circle" : "x");
};

/* Alternar turnos */
const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  setBoardHoverClass();
};

/* Clique na célula */
const handleClick = (e) => {
  const cell = e.target;
  const classToAdd = isCircleTurn ? "circle" : "x";

  placeMark(cell, classToAdd);

  const isWin = checkForWin(classToAdd);
  const isDraw = checkForDraw();

  if (isWin) {
    endGame(false); // Finaliza o jogo caso tenha um vencedor
  } else if (isDraw) {
    endGame(true); // Finaliza o jogo caso haja um empate
  } else {
    swapTurns(); // Troca de turno
  }
};

/* Inicializar o jogo */
startGame();

/* Adicionar o evento para o botão de continuar partida */
continueButton.addEventListener("click", () => {
  winningMessage.classList.remove("show-winning-message");
  continueButton.style.display = "none"; // Esconde o botão de continuar
  startGame(); // Reinicia o jogo sem zerar os pontos
});

/* Adicionar o evento para o botão de reiniciar */
restartButton.addEventListener("click", () => {
  // Reiniciar o jogo e zerar os pontos somente quando alguém atingir 3 pontos
  if (xPoints === 3 || circlePoints === 3) {
    xPoints = 0;
    circlePoints = 0;
    updateScoreboard();
  }
  startGame(); // Reinicia o jogo
});
