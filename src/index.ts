import {AssetsManager, DisplayObjectContainer, Grid2D, IMAGE_TYPE, INotification, JSON_TYPE, MouseControl, MouseControlEvent, Stage, Stats, Webgl2DRenderer} from "@thetinyspark/moocaccino-barista";
import Cell from "./Cell";
import GraphicManager from "./GraphicManager";
import ShapeFactory from "./ShapeFactory";
// render loop

let map:DisplayObjectContainer = null;
let stage:Stage = null;
let stats:Stats = null;
let grid:Grid2D<Cell> = new Grid2D<Cell>();
let isDown:boolean = false;
let filling:boolean = false;
let config:any = {};


function render(){
    stage.nextFrame();

    if( config.ticker < 0 ){
        window.requestAnimationFrame( 
            ()=>{
                render();
            }
        );
    }
    else{
        setTimeout( render,config.ticker);
    }
}

function keyHandler(event:KeyboardEvent){
    if( event.type ==="keydown"){

        if( event.key === "a" ){
            compute();
        }
        if( event.key === "z" ){
            apply();
        }
        if( event.key === "e" ){
            compute();
            apply();
        }
        if( event.key === "p" ){
            createCells();
        }
        if( event.key === "c" ){
            cleanCells();
        }
        if( event.key === "ArrowDown" ){
            map.scaleX = map.scaleX - 0.125 < 0.125 ? 0.125 : map.scaleX - 0.125;
            map.scaleY = map.scaleX;
        }
        if( event.key === "ArrowUp" ){
            map.scaleX = map.scaleX + 0.125 > 1 ? 1 : map.scaleX + 0.125;
            map.scaleY = map.scaleX;
        }
        if( event.key ==="Shift"){
            filling = true;
        }
    }
    else{
        filling = false;
    }
}

function preload(){
    window.removeEventListener("load", preload);
    const manager:AssetsManager = new AssetsManager();
    manager.queue("./assets/map.json", JSON_TYPE, "map");
    manager.queue("./assets/sheets/atlas_0.json", JSON_TYPE, "spritesheet_json");
    manager.queue("./assets/sheets/atlas_0.png", IMAGE_TYPE, "spritesheet_img");
    manager.loadQueue().then(
        ()=>{
            start(manager);
        }
    );
}

function compute(){
    grid.forEach( 
        (cell:Cell, row:number, col:number)=>{
            cell.compute(grid);
        }
    );
}

function apply(){
    grid.forEach( 
        (cell:Cell, row:number, col:number)=>{
            cell.apply();
        }
    );
}

function createMap(map:DisplayObjectContainer){
    const row:number = config.map.row;
    const col:number = config.map.col;
    const size:number = config.map.cellSize;
    grid.reset(row, col);
    grid.forEach(
        (cell:Cell, row:number, col:number)=>{
            cell = new Cell(size);
            cell.init(row,col);
            map.addChild(cell); 
            grid.addAt(row, col, cell);
        }
    );
}

function cleanCells(){
    grid.forEach(
        (cell:Cell, row:number, col:number)=>{
            cell.living = false;
        }
    );
}

function createCells(){
    const coords = ShapeFactory.prompt();
    coords.forEach( 
        (coord)=>{
            const cell = grid.getAt(coord.row, coord.col); 
            if(cell !== null )
                cell.living = true;
        }
    )
}

function mouseHandler(event:INotification){
    const type = event.getEventType();
    const cell = event.getPayload().target;

    if( type === MouseControlEvent.MOUSE_CONTROL_DOWN ){
        isDown = true;
    }
    else if( type === MouseControlEvent.MOUSE_CONTROL_UP ){
        isDown = false;
        filling = false;
    }

    if( isDown){
        cell.living = filling;
    }
}

function start(manager:AssetsManager){

    // init texture manager
    GraphicManager.getInstance().reset(manager);

    
    // create the scene/stage, note: Stage inherits from DisplayObjectContainer
    stage = new Stage();
    
    // set renderer
    stage.setRenderer(new Webgl2DRenderer());
    
    // define stage width and height
    stage.getCanvas().width = window.innerWidth;
    stage.getCanvas().height = window.innerHeight;
    
    // adds canvas to html page
    document.body.appendChild(stage.getRenderer().getCanvas());
    
    // create stats object
    stats = new Stats();
    
    // specify to stats object which object to monitore
    stats.setStage(stage);
    
    // start monitoring
    stats.start();
    
    // ad map
    config = manager.get("map");
    ShapeFactory.loadPatterns(config.patterns);
    
    
    map = new DisplayObjectContainer();
    createMap(map);
    // add map
    stage.addChild(map);
    // add stats object to the stage
    stage.addChild(stats);
    
    // start render loop
    render();
    const controls = new MouseControl(stage);
    controls.activate();

    
    stage.subscribe(MouseControlEvent.MOUSE_CONTROL_MOVE, mouseHandler);
    stage.subscribe(MouseControlEvent.MOUSE_CONTROL_UP, mouseHandler);
    stage.subscribe(MouseControlEvent.MOUSE_CONTROL_DOWN, mouseHandler);
}

window.addEventListener("load", preload);
window.addEventListener("keydown", keyHandler, true);
window.addEventListener("keyup", keyHandler, true);
