var bolts = [];
var frame = 0;
var flashFrame = 0;
var currentBolt = null;

function createBolts(numBolts, width, height){
    const bolts = [];
    for( let i = 0; i < numBolts; i++ ){ 
        const startX = Math.round( (Math.random() * width/2)  + width/4);
        const startY = -100;

        const bolt = new Lightning();
        bolt.start.x = startX;
        bolt.start.y = startY;
        bolt.build();
        bolts.push(bolt);
    }

    const bolt = new Lightning();
    bolt.start.x = width >> 1;
    bolt.start.y = 0;
    bolt.thickness = 100; 
    bolt.minAngle = 80;
    bolt.maxAngle = 100;
    bolt.build();
    bolts.push(bolt);

    return bolts;
}

function drawAll(){
    const canvas    = document.querySelector("#game");
    const context   = canvas.getContext("2d");
    bolts.forEach( 
        (b)=>{
            b.draw(context, 100);
        }
    ); 
}

function drawClouds(context){
    return;
    const img = document.getElementById("cloud"); 
    context.save();
    for( let i = 0; i < 20  ; i++ ){
        context.drawImage(img, 150 * (i-3), -150 + ((i%3) * 75)); 
    }
    context.restore();
}

function tick(){
    const canvas    = document.querySelector("#game");
    const context   = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width, canvas.height); 

    if( Math.random() > 0.99 ){
        flashFrame = Math.round( Math.random() * 80 );

        if( flashFrame > 30 ){
            const index = Math.round( (bolts.length-1) * Math.random());
            currentBolt = bolts[index]; 
            frame = 0;
        }
    }

    if( currentBolt !== null ){
        currentBolt.draw(context, frame * 15); 
        currentBolt.worldAlpha = (60 - frame) / 60; 
    }

    
    drawClouds(context);

    
    if( flashFrame > 0 ){
        context.save();
        context.globalAlpha = flashFrame / 60; 
        context.beginPath();
        context.fillStyle = "white"; 
        context.fillRect(0,0,canvas.width, canvas.height);
        context.fill();
        context.closePath();
        context.restore();
        flashFrame--;
    }

    frame++;
    setTimeout(tick,16);
}



window.addEventListener(
    "load", 
    ()=>{
        const canvas    = document.querySelector("#game");
        const width     = window.innerWidth;
        const height    = window.innerHeight;
        canvas.width    = width; 
        canvas.height   = height;
        bolts           = createBolts( 5, width, height);
        // tick();
        drawAll();
    }
)