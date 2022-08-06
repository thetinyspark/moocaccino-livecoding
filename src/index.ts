import {Animation, AssetsManager, IMAGE_TYPE, INotification, JSON_TYPE, MouseControl, MouseControlEvent, Stage, Stats, Webgl2DRenderer} from "@thetinyspark/moocaccino-barista";
import GraphicManager from "./GraphicManager";
// render loop

let stage:Stage = null;
let stats:Stats = null;


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
    manager.queue("./assets/config.json", JSON_TYPE, "config");
    manager.queue("./assets/sheets/atlas_0.json", JSON_TYPE, "spritesheet_json");
    manager.queue("./assets/sheets/atlas_0.png", IMAGE_TYPE, "spritesheet_img");
    manager.loadQueue().then(
        ()=>{
            start(manager);
        }
    );
}

function addAnimations(animations:Animation[]){
    animations.forEach( 
        (current:Animation, index:number)=>{
            const row:number = Math.floor(index / 4);
            const col:number = index % 4;
            stage.addChild( current );
            current.width = 128;
            current.height = 128;
            current.x = col * 128 + 400;
            current.y = row * 128 + 400;
            current.loop = true;
            current.play();
        }
    );
}

function createAnimations(config:any){
    const animations:Array<Animation> = new Array<Animation>();
    for( let i:number = 0; i < config.animations.length; i++ ){
        const name:string = config.animations[i].name;
        const framestep:number = config.animations[i].framestep;
        const desc = config.animations[i].frames.map( 
            (current:any, index:number)=>{
                return {
                    texture: GraphicManager.getInstance().getTextureById(current.texture), 
                    frame: (index * framestep)
                }
            }
        );
        const anim = Animation.createFromTexturesAndFrames(desc);
        anim.name = name;
        animations.push(anim);
    }
    return animations;
}

function start(manager:AssetsManager){

    // init texture manager
    GraphicManager.getInstance().reset(manager);

    // create the scene/stage, note: Stage inherits from DisplayObjectContainer
    stage = new Stage();
    
    // set renderer
    // stage.setRenderer(new Webgl2DRenderer());
    
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
    
    
    // add stats object to the stage
    stage.addChild(stats);
    
    // start render loop
    render();

    // ad animations
    const config:any = manager.get("config");
    const animations = createAnimations(config);
    addAnimations(animations);

}

window.addEventListener("load", preload);
