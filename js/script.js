// css class for different card image
const CARD_TECHS = [
  "html5",
  "css3",
  "js",
  "sass",
  "nodejs",
  "react",
  "linkedin",
  "heroku",
  "github",
  "aws",
]

// only list out some of the properties,
// add more when needed
const game = {
  score: 0,
  level: 1,
  timer: 60,
  timerDisplay: null,
  scoreDisplay: null,
  levelDisplay: null,
  timerInterval: null,
  startButton: null,
  // and much more
}
// register DOM element for further using
const DOMcontrol = {
  levelDisplay: document.querySelector(".game-stats__level--value"),
  scoreDisplay: document.querySelector(".game-stats__score--value"),
  startButton: document.querySelector(".game-stats__button"),
  timerDisplay: document.querySelector(".game-timer"),
  timeDisplayBar: document.querySelector(".game-timer__bar"),
  gameBoard: document.querySelector(".game-board"),
  gameInstruction: document.querySelector(".game-instruction"),
}

setGame()

/*******************************************
/     game process
/******************************************/
function setGame() {
  // register any element in your game object
  bindStartButton()
}

// set Game board
function setGameBoard() {
  // set game level based on current level
  game.levelDisplay = game.level
  // remove game instructions
  DOMcontrol.gameInstruction.remove()
  // set cards number and layout columns
  const setCard = {
    // level 1 has 4 cards
    1: {
      cardNum: 4,
      boardColumn: 2,
    },
    // level 2 has 16 cards
    2: {
      cardNum: 16,
      boardColumn: 4,
    },
    // level 3 has 36 cards
    3: {
      cardNum: 36,
      boardColumn: 6,
    },
  }
  // html for each card element
  const cardElmentHtml = `
  <div class='card'>
  <div class='card__face card__face--front'/>
  <div class='card__face card__face--back'/>
  </div>`
  // set game level display text
  DOMcontrol.levelDisplay.text = game.levelDisplay
  // set gameboard css to grid layout
  DOMcontrol.gameBoard.style.cssText += `
  grid-template-columns: repeat(${setCard[game.levelDisplay].boardColumn}, 1fr)`
  // set game card display
  for (let i = 0; i < setCard[game.levelDisplay].cardNum; i++) {
    //add card element
    DOMcontrol.gameBoard.innerHTML += cardElmentHtml
  }
}

function handleRestart() {}

function startGame() {
  setGameBoard()
}

function handleCardFlip() {}

function nextLevel() {}

function handleGameOver() {}

/*******************************************
/     UI update
/******************************************/
function updateScore() {}

function updateTimerDisplay() {}

/*******************************************
/     bindings
/******************************************/
function bindStartButton() {
  DOMcontrol.startButton.addEventListener("click", function () {
    // actions based on different button value
    const actions = {
      null: startGame(),
      restart: handleRestart(),
      end: handleGameOver(),
    }
    actions[game.startButton]
  })
}

function unBindCardClick(card) {}

function bindCardClick() {}
