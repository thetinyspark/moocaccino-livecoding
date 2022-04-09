import {AssetsManager, DisplayObject, DisplayObjectContainer, GamePad, GamePadTouch, GamePadTouchEvent, Geometry, IDisplayObject, IMAGE_TYPE, INotification, JSON_TYPE, Maze2D, MazeNodeType, Stage, Stats, Texture, Webgl2DRenderer} from "@thetinyspark/moocaccino-barista";
import Coin from "./Coin";
import Ghost from "./Ghost";
import GraphicManager from "./GraphicManager";
import Pacman from "./Pacman";

// render loop

let stage:Stage = null;
let mazeContainer:DisplayObjectContainer = null;
let maze:Maze2D = null;
let stats:Stats = null;
let pacman: Pacman = null;
let walls:IDisplayObject[] = [];
let coins:IDisplayObject[] = [];
let ghosts:IDisplayObject[] = [];


function render(){
    stage.nextFrame();
    pacman.move();
    checkCollideCoins();
    const collide = checkCollideWalls();
    const gameover = collideGhosts();
    if( collide ){
        pacman.goBack();
        pacman.goBack();
        pacman.goDirection("none");
    }

    if( gameover || coins.length === 0 ){
        alert("GAME OVER");
        return;
    }

    ghosts.forEach( 
        (ghost:Ghost)=>{
            if( stage.getCurrentFrame() % 60 === 0 ){
                ghost.travel(maze, pacman);
            }
            ghost.move();
        }
    )


    window.requestAnimationFrame( 
        ()=>{
            render();
        }
    )
}

function collide(object1:IDisplayObject, object2:IDisplayObject){
    const boxA = Geometry.getHitbox(object1);
    const boxB = Geometry.getHitbox(object2);

    return !( 
        boxA.bottomLeft.x > boxB.bottomRight.x || 
        boxA.bottomRight.x < boxB.bottomLeft.x || 
        boxA.bottomRight.y < boxB.topRight.y || 
        boxA.topRight.y > boxB.bottomRight.y 
    )
}

function preload(){
    window.removeEventListener("load", preload);
    const manager:AssetsManager = new AssetsManager();
    manager.queue("./assets/sheets/atlas_0.json", JSON_TYPE, "spritesheet_json");
    manager.queue("./assets/sheets/atlas_0.png", IMAGE_TYPE, "spritesheet_img");
    manager.loadQueue().then(
        ()=>{
            start(manager);
        }
    )
}

function start(manager:AssetsManager){

    // init texture manager
    GraphicManager.getInstance().reset(manager);

    // create the scene/stage, note: Stage inherits from DisplayObjectContainer
    stage = new Stage();

    // set renderer
    stage.setRenderer(new Webgl2DRenderer());

    // define stage width and height
    stage.getCanvas().width = 1024;
    stage.getCanvas().height = 768;

    // adds canvas to html page
    document.body.appendChild(stage.getRenderer().getCanvas());

    // create stats object
    stats = new Stats();
    
    // specify to stats object which object to monitore
    stats.setStage(stage);

    // start monitoring
    stats.start();

    // add stats object to the stage
    // stage.addChild(stats);




    initMaze();
    initPacman();
    initGhost();
    initGamePad();

    
    // start render loop
    render();

}

function checkCollideWalls(){
    const collisions = walls.filter( 
        (wall:IDisplayObject, index)=>{
            return collide(wall, pacman);
        }
    );

    return ( collisions.length > 0 );
}

function checkCollideCoins(){
    coins.filter( 
        (coin:Coin, index)=>{
            return collide(coin,pacman);
        }
    ).forEach( 
        (coin)=>{
            coins.splice(coins.indexOf(coin),1);
            coin.parent.removeChild(coin);
        }
    );
}

function collideGhosts(){
    const collisions = ghosts.filter( 
        (ghost:IDisplayObject, index)=>{
            return collide(ghost, pacman);
        }
    );

    return ( collisions.length > 0 );
}

function onPad(notification:INotification){
    const touch = notification.getPayload() as GamePadTouch;
    const value = touch.value as "left"|"right"|"top"|"bottom";
    pacman.goDirection(value);
}

function initGamePad(){
    const pad = new GamePad();
    window.addEventListener(
        "keydown",
        (e)=>{
            const touch = pad.getTouchByKey(e.key);
            pad.press(touch);
            pad.release(touch);
        }
    );
    pad.setTouches(
        [
            new GamePadTouch("ArrowLeft","left"),
            new GamePadTouch("ArrowRight","right"),
            new GamePadTouch("ArrowUp","top"),
            new GamePadTouch("ArrowDown","bottom"),
        ]
    ); 

    pad.subscribe(GamePadTouchEvent.PRESS_KEY, onPad);
}

function initPacman(){
    pacman = new Pacman();
    pacman.goDirection("left");
    mazeContainer.addChild( pacman );

    const floor = getRandomFloorNode();
    pacman.x = floor.col * 32 + 4;
    pacman.y = floor.row * 32 + 4;
}

function initGhost(){
    const colors = ["red","cyan","orange","pink"]
    for( let i = 0; i < colors.length; i++ ){

        const ghost = new Ghost(colors[i] as any);
        ghost.goDirection("right");
    
        mazeContainer.addChild( ghost );
        const floor = getRandomFloorNode();
        ghost.x = floor.col * 32;
        ghost.y = floor.row * 32;
        ghost.targetX = ghost.x;
        ghost.targetY = ghost.y;
    
        ghosts.push(ghost);
    }

}

function getRandomFloorNode(){
    return maze.getData().flatMap(
        (row, rowIndex)=>{
            return row.map(
                (value, colIndex)=>{
                    if( value.state.type === MazeNodeType.FREE)
                        return {row:rowIndex, col:colIndex}
                }
            )
        }
    ).sort( 
        (a,b)=>{
            return Math.random() > 0.5 ? -1 : 1;
        }
    )
    .shift();
}

function initMaze(){
    // creates maze and maze container
    maze = new Maze2D();
    maze.reset(21, 21, 1, 1);
    mazeContainer = new DisplayObjectContainer();
    maze.finalize();

    // add maze container
    stage.addChild(mazeContainer);

    const wallTexture = GraphicManager.getInstance().getTextureById("wall");
    const pathTexture = GraphicManager.getInstance().getTextureById("floor1");

    maze.getData().map(
        (row, rowIndex)=>{
            return row.map(
                (value, colIndex)=>{
                    if( value === null || value.state === null )
                        return null;

                    if( value.state.type === MazeNodeType.WALL && 
                        Math.random() > 0.8 &&
                        rowIndex !== 0 && 
                        rowIndex !== 20 && 
                        colIndex !== 0 && 
                        colIndex !== 20 
                    ){
                        value.state.type = MazeNodeType.FREE;
                    }

                    let sprite:IDisplayObject = new DisplayObject();
                    let tex = value.state.type === MazeNodeType.WALL ? wallTexture : pathTexture;
                    mazeContainer.addChild(sprite);
                    sprite.x = colIndex * 32;
                    sprite.y = rowIndex * 32;
                    sprite.width = 32;
                    sprite.height = 32;
                    sprite.texture = tex;

                    if( value.state.type !== MazeNodeType.WALL ){
                        const coin = new Coin(); 
                        coin.x = colIndex * 32 + 8;
                        coin.y = rowIndex * 32 + 8;
                        coins.push(coin);
                        mazeContainer.addChild(coin);
                    }
                    else{
                        walls.push(sprite);
                    }
                }
            )
        }
    );
}

window.addEventListener("load", preload);
