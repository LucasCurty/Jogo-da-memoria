const CARD_FRONT = "card_front";
const CARD_BACK = "card_back";
const CARD = "card";
const ICON = "icon";




let cards = null;

startGame()
//iniciar o jogo embaralhando os cards 
function startGame(){
    initializeCards(game.createCardsFromTechs());
}


//renderizando os cards
function initializeCards(){
    let tabuleiro = document.querySelector(".tabuleiro");
    tabuleiro.innerHTML = '';
    // para cada card ele esta criando uma div, com id recebido, com class recebido, o dataset é para verificar os cards iguais
    game.cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card,cardElement);

        cardElement.addEventListener('click', flipCard)
        tabuleiro.appendChild(cardElement);

    })
}

//cria os cards tanto front quando back
function createCardContent(card, cardElement){
    createCardFace(CARD_FRONT, card, cardElement);
    createCardFace(CARD_BACK, card, cardElement);
    
}
//function de criar os cards 
function createCardFace(face, card, element){
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    if(face === CARD_FRONT){
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = `assets/images/${card.icon}.png`;
        cardElementFace.appendChild(iconElement)
    }else{
        cardElementFace.innerHTML = '&lt/&gt'
    }
    element.appendChild(cardElementFace)
}




// function adicionando uma class flip, modificada no CSS
function flipCard(){
    if(game.setCard(this.id)){

       this.classList.add("flip");

       if(game.secondCard){

           if(game.checkMatch()){
               game.clearCards();
               if(game.checkGameOver()){
                   let gameOverLayer = document.getElementById("gameOver")
                   gameOverLayer.style.display = "flex";
               }
           }else{
               
            setTimeout(()=>{
                let firstCardView = document.getElementById(game.firstCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);
    
                firstCardView.classList.remove('flip');
                secondCardView.classList.remove('flip');
                game.unflipedCards();
            }, 1000);
            
           }
        }
       }
}
function restart(){
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver")
    gameOverLayer.style.display = "none";

}
