import {AssetsManager, DisplayObjectContainer, IMAGE_TYPE, INotification, JSON_TYPE, MouseControl, MouseControlEvent, Stage, Stats, Webgl2DRenderer} from "@thetinyspark/moocaccino-barista";
import GraphicManager from "./GraphicManager";
// render loop

let map:DisplayObjectContainer = null;
let stage:Stage = null;
let stats:Stats = null;
let config:any = {};


function render(){
    stage.nextFrame();
    window.requestAnimationFrame( 
        ()=>{
            render();
        }
    );
}

function keyHandler(event:KeyboardEvent){
    if( event.type ==="keydown"){
        // if( event.key === "a" ){
        //     compute();
        // }
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


function mouseHandler(event:INotification){
    const type = event.getEventType();
    const cell = event.getPayload().target;

    // if( type === MouseControlEvent.MOUSE_CONTROL_DOWN ){
    //     isDown = true;
    // }
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
    
    
    map = new DisplayObjectContainer();
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
