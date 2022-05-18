const CARD_FRONT = "card_front";
const CARD_BACK = "card_back";
const CARD = "card";
const ICON = "icon";


let techs = [
    'bootstrap', 'css', 'electron',
    'firebase', 'html', 'javascript',
    'jquery', 'mongoDB', 'node', 'react'
]

let cards = null;

startGame()
//iniciar o jogo embaralhando os cards 
function startGame(){
    cards = createCardsFromTechs(techs);
    shuffleCards(cards)
    initializeCards(cards);
}

//cria os cards de cada tech do array acima.
function createCardsFromTechs(){
    cards = [];
    
    techs.forEach((tech) => {
        cards.push(createPairFromTech(tech));
    })
    
    cards = cards.flatMap(pair => pair); // [flatMap] também retorna um array, porém se existir outro array dentro, ele separa, trasendo rodos separados.
    shuffleCards();
    return cards;
}
//renderizando os cards
function initializeCards(){
    let tabuleiro = document.querySelector(".tabuleiro");
    // para cada card ele esta criando uma div, com id recebido, com class recebido, o dataset é para verificar os cards iguais
    cards.forEach(card => {
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        cardElement.dataset.icon = card.icon;

        createCardContent(card,cardElement);

        cardElement.addEventListener('click', flipCard)
        tabuleiro.appendChild(cardElement);

    })
}
// embaralha os cards
function shuffleCards(){
    // o card atual é sempre o ultimo
    let currentIndex = cards.length;
    let randomIndex = 0;
    // enquanto o card atual for diferente de zero, execute!
    while(currentIndex !== 0){
    //posição do card aleatorio, é o numero arredondado para baixo de um numero aleatorio vezes o card atual
    randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // pega o card atual troca com o primeira card , fazendo isso ate o card atual for igual a 0, assim embaralhando nossos cards
        [cards[randomIndex], cards[currentIndex]] = [cards[currentIndex], cards[randomIndex]]
    };
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
//cria o par dos cards porem com id diferente
function createPairFromTech(tech) {
    return [{
        id: createIdTech(tech),
        icon: tech,
        flipped: false,
    },{
        id: createIdTech(tech),
        icon: tech,
        flipped: false,
    }]
}

// cria um id para o card, como o nome e um numero random
function createIdTech(tech){
    return tech + parseInt(Math.random() * 1000)
}

// function adicionando uma class flip, modificada no CSS
function flipCard(){
    this.classList.add("flip");
}