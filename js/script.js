const guessedLettersElement = document.querySelector(".guessed-letters");
const button = document.querySelector(".guess");
const textInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const spanRemainingGuesses = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again")

const word = "magnolia";
const guessedLetters = [];

const placeholder = function (word) {
    const placeholderDots = [];
    for (const letter of word) {
        console.log(letter);
        placeholderDots.push("●");
    }
    wordInProgress.innerText = placeholderDots.join("");
};

placeholder(word);

button.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = textInput.value;
    // console.log(guess);
    textInput.value = "";
    message.innerText = "";
    const goodGuess = inputValidation(guess);
    if (goodGuess) {
    makeGuess(guess);
  }
});

const inputValidation = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter from A to Z";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "This letter has already been guessed, please try another letter";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
        guessedLettersDisplay();
        updateWordInProgress(guessedLetters);

    }
};

const guessedLettersDisplay = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    // console.log(wordArray);
    const revealWord = [];
   for (const letter of wordArray) {
     if (guessedLetters.includes(letter)) {
        revealWord.push(letter.toUpperCase());
    } else {
        revealWord.push("●");
    }
   }
    wordInProgress.innerText = revealWord.join("");
    confirmWin();

};

const confirmWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    } 
};