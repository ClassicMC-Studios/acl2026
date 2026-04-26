let acc=20;
let wasInside = false;
let hoveredCard = "";
let allowHover = true;
function drawCards(hand){
    for(let i=0;i<cardTotal;i++){
       wasInside = false;
        let wasHeld = cards[i].y
        if(isInside(mouse,cardlites[i])&&allowHover){
            hoveredCard = hand[i].id.toUpperCase();
            setTimeout(()=>{hoveredCard = "";},1)
            if(cardJustUsed==undefined){
                selectColor("white");
                if(cards[i].y>centerY+40){
                    cards[i].y-=10;
                }
                wasInside=true;
            }
        }
        else{
            if(cards[i].y<cardlites[i].y&&cardJustUsed==undefined){
                cards[i].y+=10;
            }
        }
        if(cardJustUsed==i){
            acc>=0?acc-=0.5:acc=0

            wasInside = true;
            if(cards[i].y>450){
                cards[i].y-=acc;
            }
        }
        // rect(cardlites[i].x,cardlites[i].y,250,350,cardlites[i].angle,0.5)
        imageRotated(hand[i],cards[i].x,cards[i].y,250,350,cards[i].angle,wasInside ? 1 : 0.3);
        if(hand[i].id=="basic"||hand[i].id=="drain"){imageRotated(images.ln,cards[i].x+(cards[i].width/2-25),cards[i].y+(cards[i].height/2+40),50,70,cards[i].angle,wasInside ? 1 : 0.3);}
        else if(hand[i].id=="earthquake"){
            imageRotated(images.ln,cards[i].x+(cards[i].width/2-50),cards[i].y+(cards[i].height/2+40),50,70,cards[i].angle,wasInside ? 1 : 0.3);
            imageRotated(images.ln,cards[i].x+(cards[i].width/2),cards[i].y+(cards[i].height/2+40),50,70,cards[i].angle,wasInside ? 1 : 0.3);
        }
        else if(hand[i].id=="transform"){
            imageRotated(images.ln,cards[i].x+(cards[i].width/2-50),cards[i].y+(cards[i].height/2+40),50,70,cards[i].angle,wasInside ? 1 : 0.3);
            imageRotated(images.ln,cards[i].x+(cards[i].width/2-15),cards[i].y+(cards[i].height/2+40),50,70,cards[i].angle,wasInside ? 1 : 0.3);
            imageRotated(images.ln,cards[i].x+(cards[i].width/2+20),cards[i].y+(cards[i].height/2+40),50,70,cards[i].angle,wasInside ? 1 : 0.3);
        }
        selectColor("white");
    }
}