
function drawBolt(context, x,y,numPoints, gap = 0.98, thickness = 4){
    context.save();
    context.strokeStyle = "white";
    context.shadowColor = "white";
    context.shadowBlur = 20; 
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.lineWidth = thickness; 
    context.beginPath();

    let angle = 90;
    const maxAngle = 180; 
    const minAngle = 0;
    const branches = [];

    for( let i = 0; i <= numPoints; i++){
        if( i === 0 ){
            context.moveTo(x,y);
        }
        else{
            angle += Math.round( Math.random() * 50 ) - 25;
            angle = angle > maxAngle ? maxAngle : angle;
            angle = angle < minAngle ? minAngle : angle;

            const angleRadian = angle * Math.PI / 180; 
            x += Math.cos(angleRadian) * 25;
            y += Math.sin(angleRadian) * 25;
            context.lineTo( Math.round(x),Math.round(y));

            if( Math.random() >= gap ){
               branches.push({x,y});
            }
        }
    }

    context.stroke();
    context.closePath();
    context.restore();


    branches.forEach( 
        (coord)=>{
            drawBolt(context, coord.x, coord.y,Math.floor(numPoints / 2), gap + 0.01, thickness/2);
        }
    )

}

window.addEventListener(
    "load", 
    ()=>{
        const canvas    = document.querySelector("#game");
        const context   = canvas.getContext("2d");
        const width     = window.innerWidth;
        const height    = window.innerHeight;
        canvas.width    = width; 
        canvas.height   = height;
        drawBolt(context,350,0, 50, 0.95);
    }
)