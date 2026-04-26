function endTurn(){
    isEnemiesTurn = true;
    ln=0;
    buildCards(0);
    setTimeout(()=>{
        if(canEnemyAttack){
            let hurt = 10*(enemyPower+random(3))
            myhealth-=hurt;
            damageInfo = `Enemy hits for ${hurt} HP!!`
        }else{
            damageInfo = `You Evade the Attack!`
        }
        setTimeout(()=>{newTurn()},1000);
    },1000)
}

function basic(){
    enemyhealth-=2;
}
function earthquake(){
    enemyhealth-=3;
    myhealth-=55;
}
function drain(){
    enemyhealth-=2;
    if(myhealth>=245) myhealth = 300;
    else myhealth+=50;
}
function transform(){
    raco()
}

function dog(){
    random(2)==0? canEnemyAttack = false : canEnemyAttack = true;
}
function cat(){
    buildCards(0)
    isEnemiesTurn = true;
    enemyhealth -= 2;
    damageInfo = "You Hit Twice!!"
    setTimeout(()=>{newTurn()},700);
}

function triggerAttack(card,gene){
    if(card=="basic") basic();
    if(card=="earthquake") earthquake();
    if(card=="drain") drain();
    if(card=="transform") transform();

    if(gene=="Dog") dog();
    if(gene=="Cat") cat();
}
