// Selectors
const winsSel = document.querySelector('.wins');
const lossesSel = document.querySelector('.losses');
const lettersGuessedSel = document.querySelector('.letters-guessed');
const guessedLetterSel = document.querySelector('.guessed-letter');
const guessesLeftSel = document.querySelector('.guesses-left');
const messages = document.querySelector('figure');
const crystal = document.querySelector('img');

// Variables needed
const characters = 'abcdefghijklmnopqrstuvwxyz';
let letterToGuess = generateLetterToGuess(characters);
console.log(letterToGuess);
let wins = 0;
let losses = 0;
let guessesLeft = 10;
let lettersGuessed = [];

// Functions
function generateLetterToGuess(arr) {
  // Generate a random integer between 1 and the length of the characters string;
  return arr[Math.floor(Math.random() * Math.floor(arr.length))];
}

function alreadyPlayed(letter) {
  return lettersGuessed.includes(letter) ? true : false;
}

function resetGame() {
  guessesLeft = 10;
  guessesLeftSel.textContent = `Guesses Left: ${guessesLeft}`;
  lettersGuessed = [];
  lettersGuessed.textContent = lettersGuessed;
  letterToGuess = generateLetterToGuess(characters);
}

function checkLetter(letter) {
  lettersGuessed.push(letter);
  lettersGuessedSel.textContent = lettersGuessed;
  if (letter === letterToGuess) {
    wins += 1;
    crystal.className = 'crystal jump';
    winsSel.textContent = `Wins: ${wins}`;
    resetGame();
  } else {
    if (guessesLeft - 1 > 0) {
      guessesLeft -= 1;
      crystal.className = 'crystal shake';
      setTimeout(function() {
        crystal.className = 'crystal';
      }, 200);
      guessesLeftSel.textContent = `Guesses Left = ${guessesLeft}`;
    } else {
      losses += 1;
      lossesSel.textContent = `Losses: ${losses}`;
      resetGame();
    }
  }
}

function play() {
  window.addEventListener('keypress', function(e) {
    let pressedKey = e.key.toLocaleLowerCase();
    guessedLetterSel.textContent = pressedKey;
    if (alreadyPlayed(pressedKey)) {
      messages.className += ' already-guessed';
    } else {
      messages.className = 'figure';
      checkLetter(pressedKey);
    }
  });
}

play();

// **first set the variables
// **set letter to guess
//   user types a letter and
// **  check if the letter was played before
//   if not
// **  it gets stored in lettersGuessed
// **  check if it is the mystery letter
//       if it is
// **      win increases by one
// **      reset game
//       if not
// **      subtract one from guesses left
// **      check if guesses left are greater than 0
//           if they are
//             let the user type a letter
//           if not
// **          increases losses by one
// **          reset guesses left and letters guessed so far
