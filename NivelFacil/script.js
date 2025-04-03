// Variáveis que já estão definidas
const keys = document.querySelectorAll('.key');
const checkbox = document.querySelector('.checkbox__keys');
const switcher = document.querySelector('.switcher');
const keysSection = document.querySelector('.piano__keys');

// Função para tocar a nota correspondente
const playNote = (note) => {
    const audio = new Audio(`../notes/${note}.wav`);
    audio.play();
}

// Função para quando apertar nas teclas
const handleMouseDown = (key) => {
    playNote(key.getAttribute('data-note'));

    if (key.className.includes('black')) {
        key.classList.add('black--pressed');
        return;
    }

    key.style.background = '#ddd';
}

// Função para quando soltar as teclas
const handleMouseUp = (key) => {
    if (key.className.includes('black')) {
        key.classList.remove('black--pressed');
        return;
    }

    key.style.background = 'white';
}

// Event listeners para o mouse (pressionar e soltar as teclas)
keys.forEach((key) => {
    key.addEventListener('mousedown', () => handleMouseDown(key));
    key.addEventListener('mouseup', () => handleMouseUp(key));
});

// Função de ativação e desativação de teclas
checkbox.addEventListener('change', ({ target }) => {
    if (target.checked) {
        switcher.classList.add('switcher--active');
        keysSection.classList.remove('disabled-keys');
    } else {
        switcher.classList.remove('switcher--active');
        keysSection.classList.add('disabled-keys');
    }
});

// Mapeamento das teclas do teclado
const keyDownMapper = {
    "Tab": () => handleMouseDown(keys[0]),
    "1": () => handleMouseDown(keys[1]),
    "q": () => handleMouseDown(keys[2]),
    "2": () => handleMouseDown(keys[3]),
    "w": () => handleMouseDown(keys[4]),
    "e": () => handleMouseDown(keys[5]),
    "4": () => handleMouseDown(keys[6]),
    "r": () => handleMouseDown(keys[7]),
    "5": () => handleMouseDown(keys[8]),
    "t": () => handleMouseDown(keys[9]),
    "6": () => handleMouseDown(keys[10]),
    "y": () => handleMouseDown(keys[11]),
    "u": () => handleMouseDown(keys[12]),
    "8": () => handleMouseDown(keys[13]),
    "i": () => handleMouseDown(keys[14]),
    "9": () => handleMouseDown(keys[15]),
    "o": () => handleMouseDown(keys[16]),
    "p": () => handleMouseDown(keys[17]),
    "-": () => handleMouseDown(keys[18]),
    "[": () => handleMouseDown(keys[19]),
    "=": () => handleMouseDown(keys[20]),
    "]": () => handleMouseDown(keys[21]),
    "Backspace": () => handleMouseDown(keys[22]),
    "\\": () => handleMouseDown(keys[23]),
};

const keyUpMapper = {
    "Tab": () => handleMouseUp(keys[0]),
    "1": () => handleMouseUp(keys[1]),
    "q": () => handleMouseUp(keys[2]),
    "2": () => handleMouseUp(keys[3]),
    "w": () => handleMouseUp(keys[4]),
    "e": () => handleMouseUp(keys[5]),
    "4": () => handleMouseUp(keys[6]),
    "r": () => handleMouseUp(keys[7]),
    "5": () => handleMouseUp(keys[8]),
    "t": () => handleMouseUp(keys[9]),
    "6": () => handleMouseUp(keys[10]),
    "y": () => handleMouseUp(keys[11]),
    "u": () => handleMouseUp(keys[12]),
    "8": () => handleMouseUp(keys[13]),
    "i": () => handleMouseUp(keys[14]),
    "9": () => handleMouseUp(keys[15]),
    "o": () => handleMouseUp(keys[16]),
    "p": () => handleMouseUp(keys[17]),
    "-": () => handleMouseUp(keys[18]),
    "[": () => handleMouseUp(keys[19]),
    "=": () => handleMouseUp(keys[20]),
    "]": () => handleMouseUp(keys[21]),
    "Backspace": () => handleMouseUp(keys[22]),
    "\\": () => handleMouseUp(keys[23]),
};

// Teclas do teclado no modo ligado e desligado
document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (keyDownMapper[event.key]) {
        keyDownMapper[event.key]();
    }
    createNote(event.key);  // Criar a nota quando uma tecla for pressionada
});

document.addEventListener('keyup', (event) => {
    if (keyUpMapper[event.key]) {
        keyUpMapper[event.key]();
    }
});

// Seleção do botão de alternância de tema
const themeToggleButton = document.getElementById('theme-toggle');

// Função para alternar entre claro e escuro
themeToggleButton.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        themeToggleButton.textContent = '☀️'; // Ícone de lua para modo escuro
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        themeToggleButton.textContent = '🌙'; // Ícone de sol para modo claro
    }
});

// Função para criar uma nota e animá-la
function createNote(noteText) {
    const noteContainer = document.getElementById('notes-container');
    const note = document.createElement('div');
    note.classList.add('note');
    note.innerText = noteText;

    note.style.left = `${Math.random() * 1000}px`; // Para variar a posição horizontal

    noteContainer.appendChild(note);

    // Remover a nota depois da animação
    setTimeout(() => {
        note.remove();
    }, 3000); // Remover após 3 segundos
}

// Event listeners para as teclas do piano
keys.forEach(key => {
    key.addEventListener('click', (event) => {
        const noteText = event.target.innerText; // Pega a letra ou número da tecla
        createNote(noteText);
    });
});
