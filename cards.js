let cardCenterX = 960-125;
let cardDistribute = 240; 
let cardTotal = 5;
let cardJustUsed = undefined;
function buildCards(num){
    cardTotal = num;
    cards = [];
    cardlites = [];
    for(let i=0;i<num;i++){
        let offset = i-(num-1)/2;
        let yDip = (offset*offset)*10;
        let angle = num === 1 ? 0 : (offset/((num-1)/2))*7;
        cards.push({
            x:cardCenterX+(cardDistribute*offset),
            y:cy-450+yDip,
            width:250,
            height:350,
            angle:angle
        });
        cardlites.push({
            x:cardCenterX+(cardDistribute*offset),
            y:cy-450+yDip,
            width:250,
            height:350,
            angle:angle
        });
    }
}
buildCards(cardTotal)