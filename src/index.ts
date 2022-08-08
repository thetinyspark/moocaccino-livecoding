import {Animation, AssetsManager, IMAGE_TYPE, JSON_TYPE, Stage, Stats} from "@thetinyspark/moocaccino-barista";
import AnimationFrameData from "@thetinyspark/moocaccino-barista/dist/core/display/AnimationFrameData";
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

function createAnimations(config:any, data:any){
    for( let i:number = 0; i < config.animations.length; i++ ){
        const currentAnim       = config.animations[i];
        const name:string       = currentAnim.name;
        const framestep:number  = currentAnim.framestep;
        const anim              = new Animation();
        const row:number        = (i / 6)>>0;
        const col:number        = i % 6;
        anim.name               = name;
        anim.loop               = true; 
        anim.x                  = col * 128 + 128;
        anim.y                  = row * 128 + 128;
        anim.scaleX             = 2;
        anim.scaleY             = 2;

        currentAnim.frames.forEach( 
            
            (current:any, index:number)=>{

                const zone                  = data.zones.find( z=>z.id === current.texture);
                const frameData             = new AnimationFrameData();
                frameData.texture           = GraphicManager.getInstance().getTextureById(current.texture); 
                frameData.index             = index * framestep;
                frameData.offsetX           = zone.offsetX;
                frameData.offsetY           = zone.offsetY;
                frameData.width             = zone.width;
                frameData.height            = zone.height;
                frameData.originalWidth     = zone.originalWidth;
                frameData.originalHeight    = zone.originalHeight;
                frameData.name              = zone.id;

                anim.setFrameAt(index*framestep, frameData);
            }
        );

        stage.addChild(anim);
        anim.play();
    }
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
    const data:any = manager.get("spritesheet_json");
    createAnimations(config, data);

}

window.addEventListener("load", preload);
