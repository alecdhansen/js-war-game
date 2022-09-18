const computersDeck = document.querySelector(".score-display1");
const yourDeck = document.querySelector(".score-display2");
const computerCard = document.querySelector(".player1");
const yourCard = document.querySelector(".player2");
const drawButton = document.querySelector(".play-hand");
const handDisplays = document.querySelector(".hand-display");

let cards = [];
let player1 = "";
let player2 = "";
let player1ActiveCard = [];
let player2ActiveCard = [];
let battlePot = [];

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
    }
  }
};

console.log();
// -----------FUNCTIONS----------- //

const game = new Game();

let mainDeck = game.deck.cards;
let player1Hand = game.player1.hand;
let player2Hand = game.player2.hand;

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

Game.prototype.deal = function () {
  // let mainDeck = this.deck.cards;
  // let player1Hand = this.player1.hand;
  // let player2Hand = this.player2.hand;
  player1Hand = mainDeck.slice(0, 26);
  player2Hand = mainDeck.slice(26);
  computersDeck.innerHTML = player1Hand.length;
  yourDeck.innerHTML = player2Hand.length;
};

Game.prototype.start = function () {
  this.shuffle();
  this.deal();
};

function updateHandCount() {
  computersDeck.innerHTML = player1Hand.length;
  yourDeck.innerHTML = player2Hand.length;
}
function updateActiveCardDisplay() {
  computerCard.innerHTML = `${player1ActiveCard.value}${player1ActiveCard.suit}`;
  yourCard.innerHTML = `${player2ActiveCard.value}${player2ActiveCard.suit}`;
}
function compare() {
  if (player1ActiveCard.value > player2ActiveCard.value) {
    player1Hand.unshift(player1ActiveCard);
    player1Hand.unshift(player2ActiveCard);
    computerCard.style.borderColor = "greenyellow";
    yourCard.style.borderColor = "red";
  } else {
    player2Hand.unshift(player1ActiveCard);
    player2Hand.unshift(player2ActiveCard);
    computerCard.style.borderColor = "red";
    yourCard.style.borderColor = "greenyellow";
  }
}

// RUN THE GAME //
game.start();
drawButton.addEventListener(
  "click",
  (Game.prototype.draw = function () {
    updateHandCount();
    player1ActiveCard = player1Hand.pop();
    player2ActiveCard = player2Hand.pop();
    drawButton.innerHTML = "Draw";
    updateActiveCardDisplay();
    compare();
    // console.log({ player1ActiveCard });
    // console.log({ player2ActiveCard });
    // console.log({ player1Hand });
    // console.log({ player2Hand });
    updateHandCount();
  })
);
