let cx = 1920;
let cy = 1080;
let centerX = cx/2;
let centerY = cy/2;

createCanvas(cx,cy);
mouseWillMove();

let images = {
    bg:id("bg"),
    basic:id("basic"),
    earthquake:id("earthquake"),
    transform:id("transform"),
    drain:id("drain"),
    dog:id("dog"),
    ln:id("ln"),
    genmat:id("genmat"),
    dude:id("dude"),
    cat:id("gato"),
    chicken:id("galinha"),
    bisalo:id("bisalo"),
    raco:id("raco")
};

let ln = 5;
let enemyGoesFirst = false;
let enemyImage = images.bisalo;
let myhealth = 300;
let isEnemiesTurn = false;
let damageInfo = "";
let enemyhealth = 5;
let canEnemyAttack = true;
let enemyPower = 5;
let cardTypeUsed = "";

let battleWon = false;