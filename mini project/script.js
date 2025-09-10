const letters = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
                 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

let board = document.getElementById("board");
let flipped = [];
let matched = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  board.innerHTML = "";
  flipped = [];
  matched = [];
  const shuffled = shuffle([...letters]);

  shuffled.forEach((letter, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.letter = letter;
    card.dataset.index = index;
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function flipCard() {
  if (flipped.length === 2 || this.classList.contains("flipped") || matched.includes(this.dataset.index)) return;

  this.textContent = this.dataset.letter;
  this.classList.add("flipped");
  flipped.push(this);

  if (flipped.length === 2) {
    const [card1, card2] = flipped;
    if (card1.dataset.letter === card2.dataset.letter) {
      matched.push(card1.dataset.index, card2.dataset.index);
      flipped = [];
    } else {
      setTimeout(() => {
        card1.textContent = "";
        card2.textContent = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        flipped = [];
      }, 800);
    }
  }
}

startGame();