let game = {
    techs : [
        'bootstrap', 'css', 'electron',
        'firebase', 'html', 'javascript',
        'jquery', 'mongoDB', 'node', 'react'
    ], 

    cards : null,

    lockMode: false,
    firstCard: null,
    secondCard: null,

    checkGameOver(){
        return this.cards.filter(card => !card.flipped).length == 0;
    },

    //cria os cards de cada tech do array acima.
    createCardsFromTechs(){
        this.cards = [];
        
        this.techs.forEach( tech => {
            this.cards.push(this.createPairFromTech(tech));
        })
        
        this.cards = this.cards.flatMap(pair => pair); // [flatMap] também retorna um array, porém se existir outro array dentro, ele separa, trasendo rodos separados.
        this.shuffleCards();
        return this.cards;
    },
    //cria o par dos cards porem com id diferente
    createPairFromTech(tech) {
        return [{
            id: this.createIdTech(tech),
            icon: tech,
            flipped: false,
        },{
            id: this.createIdTech(tech),
            icon: tech,
            flipped: false,
        }]
    },
    // cria um id para o card, como o nome e um numero random
    createIdTech(tech){
        return tech + parseInt(Math.random() * 1000)
    },
    // embaralha os cards
    shuffleCards(){
        // o card atual é sempre o ultimo
        let currentIndex = this.cards.length;
        let randomIndex = 0;
        // enquanto o card atual for diferente de zero, execute!
        while(currentIndex !== 0){
            //posição do card aleatorio, é o numero arredondado para baixo de um numero aleatorio vezes o card atual
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            // pega o card atual troca com o primeira card , fazendo isso ate o card atual for igual a 0, assim embaralhando nossos cards
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        };
    },

    setCard(id){
      let card = this.cards.filter(card => card.id === id)[0];

      if(card.flipped || this.lockMode){
          return false;
      }
      if(!this.firstCard){
          this.firstCard = card;
          this.firstCard.flipped = true;
          return true;
      }else{
          this.secondCard = card;
          this.secondCard.flipped = true;
          this.lockMode = true;
          return true
      }
    },

    checkMatch(){
        if(!this.firstCard|| !this.secondCard){
            return false
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },
    unflipedCards(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    }
}