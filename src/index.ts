import {DisplayObject, DisplayObjectContainer, IDisplayObject, Maze2D, MazeNodeType, Stage, Stats, Texture, Webgl2DRenderer} from "@thetinyspark/moocaccino-barista";

// render loop

let stage:Stage = null;
let mazeContainer:DisplayObjectContainer = null;
let maze:Maze2D = null;
let stats:Stats = null;
let wallTexture:Texture = null;
let pathTexture:Texture = null;

function render(){
    stage.nextFrame();

    // while maze is not finished, then process
    if( !maze.isFinished())
        createMaze();

    window.requestAnimationFrame( 
        ()=>{
            render();
        }
    )
}

function start(){
    window.removeEventListener("load", start);

    // create the scene/stage, note: Stage inherits from DisplayObjectContainer
    stage = new Stage();

    // creates maze and maze container
    maze = new Maze2D();
    maze.reset((1080/32)>>0, (1920/32)>>0 - 1, 1, 1);
    mazeContainer = new DisplayObjectContainer();

    // set renderer
    stage.setRenderer(new Webgl2DRenderer());

    // define stage width and height
    stage.getCanvas().width = 1920;
    stage.getCanvas().height = 1080;

    // define textures
    wallTexture = Texture.createFromSource("wallTex", document.getElementById("wallTexture") as HTMLImageElement);
    pathTexture = Texture.createFromSource("pathTex", document.getElementById("pathTexture") as HTMLImageElement);

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

    // add maze container
    stage.addChild(mazeContainer);
    // mazeContainer.y = 100;


    // start render loop
    render();
}

function createMaze(){

    maze.finalize();

    let counter:number = 0;

    maze.getData().map(
        (row, rowIndex)=>{
            return row.map(
                (value, colIndex)=>{
                    if( value === null || value.state === null )
                        return null;

                    let sprite:IDisplayObject = mazeContainer.getChildren()[counter++] || null;
                    let tex = value.state.type === MazeNodeType.WALL ? wallTexture : pathTexture;
                    if( sprite === null ){
                        sprite = new DisplayObject();
                        mazeContainer.addChild(sprite);
                    }

                    sprite.x = colIndex * 32;
                    sprite.y = rowIndex * 32;
                    sprite.width = 32;
                    sprite.height = 32;
                    sprite.texture = tex;
                }
            )
        }
    );
}

window.addEventListener("load", start);
