const suits = ["♠", "♥", "♦", "♣"];
const numbers = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const playHandButton = document.querySelector(".play-hand");
let calculation = [];

function pushButton() {
  playHandButton.addEventListener("click", function () {
    alert("You clicked the Play Hand button");
  });
}
pushButton();

function shuffledDeck() {
  return suits.flatMap((suit) => {
    return numbers.map((value) => {
      return new Clipboard(suit, value);
    });
  });
}
