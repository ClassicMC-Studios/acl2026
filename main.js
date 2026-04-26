

let genes = [
    ["Dog","Scare Your Opponent!"],
    ["Cat","Scratch Your Opponent!"],
    ["Chicken","Peck The Eyes!"]
]

function render(){ 

    if(enemyhealth<=0){
        battleWon = true;
        allowHover = false;
    }
    
    strokeSize(5);
    bg("green");
    image(images.bg,0,0,1920,1090);
    selectColor("white");
    // rect(50,200,300,300);
    // rect(50+300,200,300,300);
    // rect(50+(300*2),200,300,300);
    // rect(50+(300*3),200,300,300);
    // rect(50+(300*4),200,300,300);
    // rect(50+(300*5),200,300,300);

    image(images.dude,50,150,300,300);
    for(let i=0;i<ln;i++){
        image(images.ln,50+(30*i),70,30,50);
    }
    selectColor("white")
    roundRect(50,140,300,30,50,0.5);
    myhealth>200? selectColor("lightgreen") : myhealth>100? selectColor("orange") : selectColor("red");
    roundRect(50,140,myhealth,30,50,0.8);


        drawCards(hand);

    if(hoveredCard!=""){
        roundRect(10,cy-110,400,100,20,0.5);
        text(`${hoveredCard}:`,10+200,cy-110+30,"20px serif",0.5);
        text(hoveredCard=="BASIC"? "Clone A Basic Move!" : hoveredCard=="EARTHQUAKE"? "More Damage But It Hurts." : hoveredCard=="DRAIN"? "Attack and Take HP!" : "Change An Enemy Out.",10+200,cy-110+70,"35px serif",0.5);
    }

    if(!allowHover&&!battleWon){
        selectColor("black");
        image(images.genmat,centerX-(1080/2),centerY-(720/2),1080,720,0.9);
        selectColor("black");
        text("Select A Gene To Clone:",centerX, centerY-(720/2)+170,"60px serif");
        selectColor("lightblue");
        image(images.dog,550,450,200,200);
        image(images.cat,850,450,200,200);
        image(images.chicken,1150,450,200,200);
        selectColor("blue")
        if(isInside(mouse,{x:550,y:450,width:200,height:200})){
            text(`${genes[0][0]} — ${genes[0][1]}`,centerX, centerY-(720/2)+570,"60px serif",0.6);
        }
        if(isInside(mouse,{x:850,y:450,width:200,height:200})){
            text(`${genes[1][0]} — ${genes[1][1]}`,centerX, centerY-(720/2)+570,"60px serif",0.6);
        }
        if(isInside(mouse,{x:1150,y:450,width:200,height:200})){
            text(`${genes[2][0]} — ${genes[2][1]}`,centerX, centerY-(720/2)+570,"60px serif",0.6);
        }
    }

    if(!allowHover&&battleWon){
        selectColor("black");
        image(images.genmat,centerX-(1080/2),centerY-(720/2),1080,720,0.9);
    }
    
    image(enemyImage,cx-400,170,300,300,1,true);

    // roundRect(cx-400,140,300,30,50,0.5);
    enemyhealth>=5? selectColor("lightgreen") : enemyhealth<5? selectColor("orange") : selectColor("red");
    // roundRect(cx-400,140,300-(enemyhealth),30,50,0.8);
    ellipse(cx-250,150,10,10);

    selectColor("lightblue");
    if(isInside(mouse,{x:cx-150,y:cy-150,width:100,height:100})) rect(cx-150,cy-150,100,100,0.8);
    else rect(cx-150,cy-150,100,100,0.5);
    selectColor("black");
    text("END",cx-100,cy-105,"20px serif",0.5);
    text("TURN",cx-100,cy-85,"20px serif",0.5);

    if(isEnemiesTurn){
        selectColor("lightblue")
        roundRect(centerX-550,centerY+100,1100,300,20,0.5);
        selectColor("black")
        text(damageInfo,centerX,centerY+280,"100px serif")
    }
}
mouseClicked(()=>{
    for(let i=0;i<cardTotal;i++){
        let cost;
        hand[i].id=="basic"? cost=1 : hand[i].id=="earthquake"? cost=2 : hand[i].id=="drain"? cost=1 : cost=3
        if(isInside(mouse,cards[i])&&ln>=cost){
            ln-=cost;
            if(cardJustUsed==undefined){
                cardJustUsed = i;
            }
            cardTypeUsed = hand[i].id
            setTimeout(()=>{hand.splice(cardJustUsed, 1);acc=20;cardJustUsed=undefined;cardTotal-=1;buildCards(cardTotal);allowHover=false;},1000);
        }
    }

    //for gene choice
    if(isInside(mouse,{x:550,y:450,width:200,height:200})){
        allowHover = true;
        triggerAttack(cardTypeUsed,genes[0][0]);
    }
    if(isInside(mouse,{x:850,y:450,width:200,height:200})){
        allowHover = true;
        triggerAttack(cardTypeUsed,genes[1][0]);
    }
    if(isInside(mouse,{x:1150,y:450,width:200,height:200})){
        allowHover = true;
        triggerAttack(cardTypeUsed,genes[2][0]);
    }

    //for end turn
    if(isInside(mouse,{x:cx-150,y:cy-150,width:100,height:100})) endTurn();
});