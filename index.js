const cardsColor = ["red", "red", "blue", "blue", "green", "green", 
"yellow", "yellow", "brown", "brown", "gray", "gray", "lightgreen", "lightgreen",
 "cadetblue", "cadetblue", "violet", "violet"];

 let cards = document.getElementsByTagName("div");
 cards = [...cards];

const startTime = new Date().getTime();

let activeCard = "";
const activeCards = [];

const gamePairs = cards.length/2;

let gameResult = 0;

 const clickCard = function () {
 	activeCard = this;

 	if(activeCard == activeCard[0]) return;
  	activeCard.classList.remove('hidden');
   
   // czy to 1 kliknięcie
   if (activeCards.length === 0) {
     activeCards[0] = activeCard;
     return;
   }
   // czy to 2 kliknięcie
   else {
     cards.forEach(card => {
       card.removeEventListener('click', clickCard)
     })
     activeCards[1] = activeCard;
   setTimeout(function() {
      if (activeCards[0].className === activeCards[1].className) {
       console.log('wygrana');
       activeCards.forEach(card => card.classList.add('off'));
       gameResult++;
       cards = cards.filter(card => !card.classList.contains('off'));
       if(gameResult == gamePairs) {
       	const endTime = new Date().getTime();
       	const gameTime = (endTime - startTime)/1000;
       	alert(`Udało się! Twój wynik to: ${gameTime}sekund`)
       	location.reload();
       }
     } else {
       console.log('przegrana');
         activeCards.forEach(card => card.classList.add('hidden'))
     	}
     	activeCard = "";
     	activeCards.length = 0;
     	cards.forEach(card => card.addEventListener('click', clickCard))

  	 }, 500)
	}
 }

 const init = function () {
 	cards.forEach(card => {
 		const position = Math.floor(Math.random()*cardsColor.length);
 		card.classList.add(cardsColor[position]);
 		cardsColor.splice(position, 1);
 	})

 	setTimeout(function() {
 		cards.forEach(card => {
 			card.classList.add('hidden')
 			card.addEventListener('click', clickCard)
 		})
 	}, 3000)
 }

 init();