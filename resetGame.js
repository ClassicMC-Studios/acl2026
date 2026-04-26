let types = [images.basic,images.transform,images.drain,images.earthquake];

let hand = []

function newTurn(){
    hand.length = 0;
    for(let i=0;i<5;i++){
        hand.push(types[random(4)])
    }
    isEnemiesTurn = false;
    damageInfo = "";
    ln = 5+random(3);
    buildCards(5);
}
newTurn();