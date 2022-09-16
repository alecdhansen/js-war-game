const computersDeck = document.querySelector(".score-display1");
const yourDeck = document.querySelector(".score-display2");
const computerCard = document.querySelector(".player1");
const yourCard = document.querySelector(".player2");
const drawButton = document.querySelector(".play-hand");

// let mainDeck = [];
// let computerDeck = [];
// let playerDeck = [];
let cards = [];
// let values = [
//   "14",
//   "13",
//   "12",
//   "11",
//   "10",
//   "9",
//   "8",
//   "7",
//   "6",
//   "5",
//   "4",
//   "3",
//   "2",
// ];
// let suits = ["♥", "♦", "♠", "♣"];
let player1 = "";
let player2 = "";

// ----------CONSTRUCTORS---------- //

const Player = function ({ name, hand } = {}) {
  this.name = name;
  this.hand = [];
};
const Game = function () {
  this.player1 = new Player({ name: "Computer" });
  this.player2 = new Player({ name: "You" });
  this.deck = new Deck();
};

const Card = function ({ value, suit }) {
  this.value = value;
  this.suit = suit;
};

const Deck = function () {
  this.cards = [];
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
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < values.length; j++) {
      const suit = suits[i];
      const value = values[j];
      this.cards.push(new Card({ value, suit }));
      // mainDeck = shuffleArray(mainDeck);
      // computerDeck = mainDeck.slice(26);
      // playerDeck = mainDeck.slice(0, 26);
    }
  }
  // console.log(this.cards);
};

console.log();
// -----------FUNCTIONS----------- //

Game.prototype.shuffle = function () {
  let currentIndex = this.deck.cards.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [this.deck.cards[currentIndex], this.deck.cards[randomIndex]] = [
      this.deck.cards[randomIndex],
      this.deck.cards[currentIndex],
    ];
  }
};

// YOU ARE WORKING HERE!!!!!!!//------------------------------------------------------------------------------------and this isn't correct
Game.prototype.deal = function () {
  console.log(this.deck);
  let player1Hand = this.player1.hand;
  let player2Hand = this.player2.hand;
  let mainDeck = this.deck;
  player1Hand = mainDeck.slice(0, 26);
  player2Hand = mainDeck.slice(26);
  // console.log(this.player1.hand);
};

Game.prototype.draw = function () {};

Game.prototype.start = function () {
  this.shuffle();
  this.deal();
};

// RUN THE GAME //
const game = new Game();
game.start();
drawButton.addEventListener("click", game.draw());

// console.log(game);
