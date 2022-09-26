const yourDeck = document.querySelector(".score-display1");
const computerDeck = document.querySelector(".score-display2");
const yourCard = document.querySelector(".player1");
const computerCard = document.querySelector(".player2");
const drawButton = document.querySelector(".play-hand");
const handDisplays = document.querySelector(".hand-display");
const actionText = document.querySelector(".action-text");

let cards = [];
let player1 = "";
let player2 = "";
let player1ActiveCard = [];
let player2ActiveCard = [];
let battlePot1 = [];
let battlePot2 = [];
let gameOver = false;

// ----------CONSTRUCTORS---------- //

const Player = function ({ name, hand } = {}) {
  this.name = name;
  this.hand = [];
  this.activeCard = {};
};
const Game = function () {
  this.player1 = new Player({ name: "You" });
  this.player2 = new Player({ name: "Computer" });
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
// -----------FUNCTIONS----------- //

const game = new Game();

let mainDeck = game.deck.cards;
let player1Hand = game.player1.hand;
let player2Hand = game.player2.hand;

Game.prototype.shuffle = function () {
  let i = this.deck.cards.length,
    randomIndex;
  while (i !== 0) {
    i--; //added above!
    randomIndex = Math.floor(Math.random() * i);
    [this.deck.cards[i], this.deck.cards[randomIndex]] = [
      this.deck.cards[randomIndex],
      this.deck.cards[i],
    ];
  }
};

Game.prototype.deal = function () {
  player1Hand = mainDeck.slice(0, 26);
  player2Hand = mainDeck.slice(26);
  yourDeck.innerHTML = player1Hand.length;
  computerDeck.innerHTML = player2Hand.length;
};

Game.prototype.start = function () {
  this.shuffle();
  this.deal();
};
Game.prototype.checkGameOver = function () {
  if (player1Hand.length === 0 || player2Hand.length === 0) {
    if (player1Hand.length === 0) {
      actionText.value = `${this.player1.name} are out of cards. ${this.player2.name} wins!`;
      console.log("player2 wins");
      drawButton.disabled = true;
    } else {
      actionText.value = `${this.player2.name} is out of cards. ${this.player1.name} win!`;
      console.log("player1 wins");
      drawButton.disabled = true;
    }
  }
};
function updateHandCount() {
  yourDeck.innerHTML = player1Hand.length;
  computerDeck.innerHTML = player2Hand.length;
}
function updateActiveCardDisplay() {
  yourCard.innerHTML = `${player1ActiveCard.value}${player1ActiveCard.suit}`;
  computerCard.innerHTML = `${player2ActiveCard.value}${player2ActiveCard.suit}`;
}

function compare() {
  if (parseInt(player1ActiveCard.value) > parseInt(player2ActiveCard.value)) {
    player1Hand.unshift(player1ActiveCard);
    player1Hand.unshift(player2ActiveCard);
    yourCard.style.borderColor = "#7ad33a";
    computerCard.style.borderColor = "#e01313";
    updateHandCount();
    actionText.value = `${game.player1.name} won the hand!`;
  } else if (
    parseInt(player2ActiveCard.value) > parseInt(player1ActiveCard.value)
  ) {
    player2Hand.unshift(player1ActiveCard);
    player2Hand.unshift(player2ActiveCard);
    yourCard.style.borderColor = "#e01313";
    computerCard.style.borderColor = "#7ad33a";
    actionText.value = `${game.player2.name} won the hand!`;
    updateHandCount();
  } else {
    player1BattleCard = player1Hand.slice(-5, player1Hand.length - 4);
    player2BattleCard = player2Hand.slice(-5, player2Hand.length - 4);
    console.log({ player1BattleCard });
    console.log({ player2BattleCard });
    yourCard.style.borderColor = "#dc851a";
    computerCard.style.borderColor = "#dc851a";
    battlePot1 = player1Hand.splice(-3);
    battlePot2 = player2Hand.splice(-3);

    if (
      parseInt(player1BattleCard[0].value) >
      parseInt(player2BattleCard[0].value)
    ) {
      console.log(
        "YOU WIN THE BATTLE",
        `${player1BattleCard[0].value} beats ${player2BattleCard[0].value}`
      );
      actionText.value = `Battle! ${game.player1.name} won the battle!`;
      console.log("BATTLE", battlePot1, battlePot2);
      player1Hand.unshift(...battlePot1, ...battlePot2);
      player1Hand.unshift(player1ActiveCard);
      player1Hand.unshift(player2ActiveCard);
    } else if (
      parseInt(player2BattleCard[0].value) >
      parseInt(player1BattleCard[0].value)
    ) {
      console.log(
        "COMPUTER WINS THE BATTLE",
        `${player2BattleCard[0].value} beats ${player1BattleCard[0].value}`
      );
      console.log("BATTLE", battlePot1, battlePot2);
      actionText.value = `Battle! ${game.player2.name} won the battle!`;
      player2Hand.unshift(...battlePot1, ...battlePot2);
      player2Hand.unshift(player1ActiveCard);
      player2Hand.unshift(player2ActiveCard);
    }
    updateHandCount();
  }
}
// RUN THE GAME //
game.start();
drawButton.addEventListener(
  "click",
  (game.draw = function () {
    updateHandCount();
    player1ActiveCard = player1Hand.pop();
    player2ActiveCard = player2Hand.pop();
    drawButton.innerHTML = "Draw";
    updateActiveCardDisplay();
    compare();
    game.checkGameOver();
  })
);
