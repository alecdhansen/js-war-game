const scoreDisplay1 = document.querySelector(".score-display1");
const scoreDisplay2 = document.querySelector(".score-display2");
const computerCard = document.querySelector(".player1");
const playerCard = document.querySelector(".player2");
const drawButton = document.querySelector(".play-hand");

let mainDeck = [];
let computerDeck = [];
let playerDeck = [];
let cards = [];
let values = [
  "14",
  "13",
  "12",
  "11",
  "10",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];
let suits = ["♥", "♦", "♠", "♣"];
let player1 = "";
let player2 = "";

// ----------CONSTRUCTORS---------- //

const Player = function ({ name, deck, hand } = {}) {
  (this.name = name), (this.deck = new Deck()), (this.hand = hand);
};
const Game = function ({ player1, player2 }) {
  (this.player1 = new Player("Computer")), (this.player2 = new Player("You"));
};
const game = new Game();

const Deck = function ({ card }) {
  this.card = new Card();
};
const Card = function ({ value, suit }) {
  (this.value = value), (this.suit = suit);
};

Deck.prototype.hands = setUpTwoDecks();
// -----------FUNCTIONS----------- //

function setUpTwoDecks() {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      const suit = suits[i];
      const value = values[j];
      // console.log(suit);
      // console.log(value);
      mainDeck.push({ value, suit });
      mainDeck = shuffleArray(mainDeck);
      computerDeck = mainDeck.slice(26);
      playerDeck = mainDeck.slice(0, 26);
    }
  }
  // console.log(computerDeck);
  // console.log(playerDeck);
}
setUpTwoDecks();

function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function drawCard() {
  let topCard1 = player1.deck.card[0];
  let topCard2 = player2.deck.card[0];
}
