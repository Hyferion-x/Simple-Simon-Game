// References to DOM elements
const startButton = document.getElementById('start-btn');
const statusMessage = document.getElementById('status-message');
const gameButtons = document.querySelectorAll('.game-btn');
const scoreMessage = document.getElementById('score-message');
const highScoreMessage = document.getElementById('high-score');

// Accessing player name from URL parameters
const playerName = new URLSearchParams(window.location.search).get('name');

// Colors array
const colors = ["red", "green", "blue", "yellow"];

// Game variables
let gameSequence = [];
let playerSequence = [];
let round = 0;
let isSimonTurn = false;
let highScore = 0;

// Start button event listener
startButton.addEventListener('click', () => {
    startButton.disabled = true;
    playSimonSequence();
});

// Event listeners for each game button
gameButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        handleButtonClick(index);
    });
});

// Function to handle player button clicks
function handleButtonClick(colourIndex) {
    if (!isSimonTurn) {
        const colour = colors[colourIndex];
        playerSequence.push(colour);
        const button = document.getElementById(`btn${colourIndex + 1}`);
        button.style.opacity = '0.5';
        setTimeout(() => {
            button.style.opacity = '1';
            checkPlayerSequence();
        }, 300);
    }
}

// Function to get a random number between min and max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to play Simon's sequence
function playSimonSequence() {
    isSimonTurn = true;
    statusMessage.textContent = "Simon's Turn";
    gameSequence.push(colors[getRandomNumber(0, 3)]);
    animateSequence(0); // Start animating the sequence
}

// Function to animate the game sequence
function animateSequence(index) {
    if (index < gameSequence.length) {
        setTimeout(() => {
            const button = document.getElementById(`btn${colors.indexOf(gameSequence[index]) + 1}`);
            button.style.opacity = '0.5';

            setTimeout(() => {
                button.style.opacity = '1';
                animateSequence(index + 1);
            }, 500);
        }, 1000);
    } else {
        isSimonTurn = false;
        statusMessage.textContent = `${playerName}'s Turn`;
        playerSequence = [];
    }
}

// Function to check the player's sequence against Simon's sequence
function checkPlayerSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== gameSequence[i]) {
            gameOver();
            return;
        }
    }
    if (playerSequence.length === gameSequence.length) {
        setTimeout(() => {
            round++;
            statusMessage.textContent = "Correct!";
            setTimeout(() => {
                playSimonSequence();
            }, 1000);
        }, 500);
    }
}

// Function to handle game over scenarios
function gameOver() {
    statusMessage.textContent = "Game Over!";
    scoreMessage.textContent = `Previous Score: ${round}`;
    if (round > highScore) {
        highScore = round;
        highScoreMessage.textContent = `High Score: ${highScore}`;
    }
    round = 0;
    gameSequence = [];
    startButton.disabled = false;
}
