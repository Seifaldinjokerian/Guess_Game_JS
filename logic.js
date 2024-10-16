//! Intialization The Variables
const gameName = "Guess The Word";
let title = (document.querySelector("h1:first-of-type").innerHTML = gameName),
  footer = (document.querySelector(
    "footer"
  ).innerHTML = `${gameName} Developed by Seif AL-din`);

let numOfTries = 6;
let numOfLetters = 6;
let currentTry = 1;
let wordToGuess = "";
let numOfHints = 2;

const wordsArr = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "School",
  "Mainly",
  "Elzero",
  "Letter",
];
wordToGuess =
  wordsArr[Math.floor(Math.random() * wordsArr.length)].toLowerCase();
let messageArea = document.querySelector(".message");

document.querySelector(".hint span").innerHTML = numOfHints;

let hintsBtn = document.querySelector(".hint");
hintsBtn.addEventListener("click", getHints);

window.onload = () => {
  generator();
};

function generator() {
  let inputsContainer = document.querySelector(".inputs");

  for (let i = 1; i <= numOfTries; i++) {
    let lettersDiv = document.createElement("div");
    lettersDiv.classList.add(`try-${i}`);
    lettersDiv.innerHTML = `<span>Try ${i}</span>`;
    if (i !== 1) lettersDiv.classList.add("disabled-inputs");

    for (let j = 1; j <= numOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      lettersDiv.appendChild(input);
    }
    inputsContainer.appendChild(lettersDiv);
  }
  inputsContainer.children[0].children[1].focus();

  const inputsDisabled = document.querySelectorAll(".disabled-inputs input");
  inputsDisabled.forEach((inp) => (inp.disabled = true));

  const inputs = document.querySelectorAll("input");

  inputs.forEach((inp, index) => {
    inp.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      const nextInp = inputs[index + 1];
      if (nextInp) nextInp.focus();
    });

    inp.addEventListener("keydown", function (e) {
      this.value = this.value.toUpperCase();
      const currentInp = Array.from(inputs).indexOf(e.target);

      if (e.key === "ArrowRight") {
        const nextInp = currentInp + 1;
        if (nextInp < inputs.length) inputs[nextInp].focus();
      } else if (e.key === "ArrowLeft") {
        const prevInp = currentInp - 1;
        if (prevInp >= 0) inputs[prevInp].focus();
      }
    });
  });
}

const guessBtn = document.querySelector(".check-word");

guessBtn.addEventListener("click", handleGuesses);
console.log(wordToGuess);

function handleGuesses() {
  let success = true;
  console.log(wordToGuess);
  for (let i = 1; i <= numOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    if (letter == actualLetter) {
      inputField.classList.add("in-place");
      success = true;
    } else if (wordToGuess.includes(letter) && letter != "") {
      inputField.classList.add("not-in-place");
      success = false;
    } else {
      inputField.classList.add("wrong");
      success = false;
    }
  }

  let greetingWord = [
    "WoW",
    "Awsome",
    "Super",
    "Incredible",
    "Unbelieveble",
    "Amazinge",
    "No Hints 😏",
  ];
  let randomGreetingWord =
    greetingWord[Math.floor(Math.random() * greetingWord.length)];

  if (success == true && wordToGuess !== "") {
    messageArea.innerHTML = `You win, The word is <span>${wordToGuess}</span>`;
    if (numOfHints == 2) {
      messageArea.innerHTML = `<p>${randomGreetingWord}</p>, The word is <span>${wordToGuess}</span>`;
    }

    let allDivs = document.querySelectorAll(".inputs > div");
    allDivs.forEach((div) => div.classList.add("disabled-inputs"));
    guessBtn.disabled = true;
    document.querySelector(".hint").disabled = true;
  } else if (success === false) {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");
    const currentTryInp = document.querySelectorAll(`.try-${currentTry} input`);
    currentTryInp.forEach((inp) => (inp.disabled = true));
    currentTry++;

    if (currentTry <= 6) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-inputs");

      const nextTryInp = document.querySelectorAll(`.try-${currentTry} input`);
      nextTryInp.forEach((inp) => (inp.disabled = false));
      document.querySelector(`.try-${currentTry}`).children[1].focus();
    } else if (currentTry == 7) {
      guessBtn.disabled = true;
      document.querySelector(".hint").disabled = true;
      messageArea.innerHTML = `Game Over, The word is <span>${wordToGuess}</span>`;
    }
  }
}

function getHints() {
  if (numOfHints > 0) {
    numOfHints--;
    document.querySelector(".hint span").innerHTML = numOfHints;
  }
  if (numOfHints == 0) hintsBtn.disabled = true;

  const randomLetter = wordToGuess.charAt(
    Math.floor(Math.random() * wordToGuess.length)
  );
  const enabledInps = document.querySelectorAll(`input:not(:disabled)`);
  const emptyEnabledInps = Array.from(enabledInps).filter(
    (inp) => inp.value === ""
  );

  if (emptyEnabledInps.length > 0) {
    const randomInp =
      emptyEnabledInps[Math.floor(Math.random() * emptyEnabledInps.length)];
    const indexToFill = Array.from(enabledInps).indexOf(randomInp);
    console.log(indexToFill);
    console.log(randomInp);
    if (indexToFill !== -1 && randomInp.value == "") {
      randomInp.value = wordToGuess[indexToFill].toUpperCase();
    }
  }
}

function handleBackSpace(event) {
  if (event.key == "Backspace") {
    const inputs = document.querySelectorAll(`input:not(:disabled)`);
    const currentIndex = Array.from(inputs).indexOf(document.activeElement);
    if (currentIndex > 0) {
      const currentActiveInp = inputs[currentIndex];
      const prevActiveInp = inputs[currentIndex - 1];
      currentActiveInp.value = "";
      prevActiveInp.focus();
      prevActiveInp.value = "";
      console.log(currentActiveInp);
      console.log(prevActiveInp);
    }
  }
}

document.addEventListener("keydown", handleBackSpace);

let str = "seif aldin";

console.log(wordToGuess.charAt(Math.floor(Math.random() * wordToGuess.length)));
