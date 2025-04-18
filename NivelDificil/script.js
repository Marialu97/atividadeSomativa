
/* Seleção de elementos do html */
//células do tabuleiro de jogo /Os elementos possuem o atributo 'data-cell'
const cellElements = document.querySelectorAll("[data-cell]"); 
// Seleciona o contêiner do tabuleiro de jogo
const board = document.querySelector("[data-board]");
// Seleciona o elemento onde será exibido o texto da mensagem de vitória (por exemplo, "Jogador X venceu!")
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");
// Seleciona o contêiner completo da mensagem de vitória,
const winningMessage = document.querySelector("[data-winning-message]");
// Seleciona o botão que permite continuar o jogo depois de exibida a mensagem de vitória
const continueButton = document.querySelector("[data-continue-button]");
// Seleciona o botão que reinicia o jogo
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
    }, 10); // Atrasar um pouco para mostrar a mensagem de vitória
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

  // Verifica se alguma combinação vencedora foi alcançada
  return winningCombinations.some((combination) => {
    // Para cada combinação, verifica se todas as células dessa combinação pertencem ao jogador atual
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentPlayer);
    });
  });
};

/* Verificar empate */
const checkForDraw = () => {
  // Verifica se todas as células têm a classe "x" ou "circle"
  return [...cellElements].every((cell) => {
     // A célula deve conter pelo menos uma dessas classes para não ser vazia
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
};

/* Adicionar símbolo à célula */
const placeMark = (cell, classToAdd) => {
  cell.classList.add(classToAdd);
};

/* Configurar a classe do board para mostrar quem joga */
const setBoardHoverClass = () => {
  // Remove as classes "circle" e "x" do tabuleiro para garantir que não haja classes conflitantes.
  board.classList.remove("circle", "x");
  // Adiciona a classe correspondente ao jogador atual
  board.classList.add(isCircleTurn ? "circle" : "x");
};

/* Alternar turnos */
const swapTurns = () => {
  isCircleTurn = !isCircleTurn;
  setBoardHoverClass();
};

/* Clique na célula */
const handleClick = (e) => {
  const cell = e.target; // Obtemos a célula que foi clicada
  const classToAdd = isCircleTurn ? "circle" : "x";
 // Colocamos a marca na célula
  placeMark(cell, classToAdd);
// Verifica se um jogador ganhou o jogo
  const isWin = checkForWin(classToAdd);
  // Verifica se o jogo terminou em empate
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
    xPoints = 0;     // Zera os pontos dos dois jogadores
    circlePoints = 0;
    updateScoreboard(); // Atualiza o placar no painel
  }
  startGame(); // Reinicia o jogo
});
