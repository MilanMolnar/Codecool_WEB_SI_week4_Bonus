const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function startGame(){
  document.querySelectorAll('.memory-card').forEach(c => {
    c.style.display = "block";
});
document.querySelectorAll('.memory-card').forEach(c => {
  c.style.cursor = "pointer"});
document.querySelector('.titleGame').style.display = "none";
document.querySelector('a').style.display = "none";
document.querySelector('.resetButton').style.display = "block";
}

function resetGame(){
  cards.forEach(card => card.classList.remove('flip'))
  resetBoard()
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
    card.style.cursor = "pointer";
  });
  
  cards.forEach(card => card.addEventListener('click', flipCard));
}

//flipping the cards with eventlistenres
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}
//Checking if the dataset value is the same of the two flipped card
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}
//Removing eventlisteners from found cards
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  firstCard.style.cursor = "not-allowed";
  secondCard.style.cursor = "not-allowed";
  resetBoard();
}
//If not match unflip the cards so it shows the backside again
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
