import {AssetsManager, Geometry, IMAGE_TYPE, INotification, JSON_TYPE, MouseControl, MouseControlEvent, Stage, Webgl2DRenderer} from "@thetinyspark/moocaccino-barista";
import GraphicManager from "./GraphicManager";
import AbstractVotingMethod from "./model/methods/AbstractVotingMethod";
import VotingMethodFactory from "./model/factory/VotingMethodFactory";
import CandidateBoard from "./view/CandidateBoard";
// render loop

let map:CandidateBoard = null;
let stage:Stage = null;
let config:any = {};
let method:AbstractVotingMethod = null;


function render(){
    stage.nextFrame();
    window.requestAnimationFrame( 
        ()=>{
            render();
        }
    );
}

function preload(){
    window.removeEventListener("load", preload);
    const manager:AssetsManager = new AssetsManager();
    manager.queue("./assets/data.json", JSON_TYPE, "data");
    manager.queue("./assets/sheets/atlas_0.json", JSON_TYPE, "spritesheet_json");
    manager.queue("./assets/sheets/atlas_0.png", IMAGE_TYPE, "spritesheet_img");
    manager.loadQueue().then(
        ()=>{
            start(manager);
        }
    );
}

function mouseHandler(event:INotification){
    method.compute();
    map.updateCandidates(method.getData().candidates);
}

function generateVotes(config){
    config.generators.forEach( 
        (current)=>{
            for( let i = 0; i < current.num; i++){
                config.votes.push(
                    {
                        id: config.votes.length, 
                        choices: [...current.pattern]
                    }
                );
            }
        }
    );
    console.log(config.votes);
}

function addStage(){
    // create the scene/stage, note: Stage inherits from DisplayObjectContainer
    stage = new Stage();
    
    // set renderer
    stage.setRenderer(new Webgl2DRenderer());
    
    // define stage width and height
    stage.getCanvas().width = window.innerWidth;
    stage.getCanvas().height = window.innerHeight;
    // adds canvas to html page
    document.body.appendChild(stage.getRenderer().getCanvas());
}

function addBoard(config){
    map = new CandidateBoard();
    map.reset(config);

    // add map
    stage.addChild(map);
    stage.nextFrame();
    const bounds = Geometry.getBoundingRect(map);
    map.x = ( window.innerWidth - bounds.width ) >> 1;
    map.y = ( window.innerHeight - bounds.height ) >> 1;
}

function addVotingMethod(){
    const factory = new VotingMethodFactory();
    method = factory.resolve(config.method);
    method.setData(config);
}

function addControls(){
    const controls = new MouseControl(stage);
    controls.activate();
    stage.subscribe(MouseControlEvent.MOUSE_CONTROL_DOWN, mouseHandler);
}

function start(manager:AssetsManager){

    // init texture manager
    GraphicManager.getInstance().reset(manager);

    // config
    config = manager.get("data");
    generateVotes(config);
    addStage();
    addBoard(config);
    addControls();
    addVotingMethod();
    
    // start render loop
    render();
}

window.addEventListener("load", preload);
