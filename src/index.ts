import {Animation, AssetsManager, FiniteStateMachine, IMAGE_TYPE, INotification, IState, JSON_TYPE, Stage, Stats} from "@thetinyspark/moocaccino-barista";
import AnimationFrameData from "@thetinyspark/moocaccino-barista/dist/core/display/AnimationFrameData";
import buildAnimationData from "./buildAnimationData";
import Character from "./Character";
import FSMVisualizer from "./FSMVisualizer";
import GraphicManager from "./GraphicManager";
// render loop

let stage:Stage = null;
let stats:Stats = null;
let rawl:Character = null;
const fsm = new FiniteStateMachine(); 
const visualizer = new FSMVisualizer();

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
    manager.queue("./assets/sheets/atlas_0.json", JSON_TYPE, "spritesheet_json_0");
    manager.queue("./assets/sheets/atlas_0.png", IMAGE_TYPE, "spritesheet_img_0");
    manager.queue("./assets/sheets/atlas_1.json", JSON_TYPE, "spritesheet_json_1");
    manager.queue("./assets/sheets/atlas_1.png", IMAGE_TYPE, "spritesheet_img_1");
    manager.queue("./assets/sheets/atlas_2.json", JSON_TYPE, "spritesheet_json_2");
    manager.queue("./assets/sheets/atlas_2.png", IMAGE_TYPE, "spritesheet_img_2");
    manager.queue("./assets/sheets/atlas_3.json", JSON_TYPE, "spritesheet_json_3");
    manager.queue("./assets/sheets/atlas_3.png", IMAGE_TYPE, "spritesheet_img_3");
    manager.queue("./assets/sheets/atlas_4.json", JSON_TYPE, "spritesheet_json_4");
    manager.queue("./assets/sheets/atlas_4.png", IMAGE_TYPE, "spritesheet_img_4");
    manager.loadQueue().then(
        ()=>{
            start(manager);
        }
    );
}

function createAnimations(animations:any):Animation[]{

    const collection = [];
    for( let i:number = 0; i < animations.length; i++ ){
        const currentAnim       = animations[i];
        const name:string       = currentAnim.name;
        const framestep:number  = currentAnim.framestep;
        const anim              = new Animation();
        anim.name               = name;
        anim.loop               = currentAnim.loop; 
        anim.scaleX             = 1;
        anim.scaleY             = 1;

        currentAnim.frames.forEach( 
            
            (current:any, index:number)=>{
                const zone                  = GraphicManager.getInstance().getZoneById(current.texture);

                if( zone === null ){
                    console.log("cannot find zone ",current.texture);
                    return;
                }

                const texture = GraphicManager.getInstance().getTextureById(current.texture);

                if(texture === null ){
                    console.log("cannot find texture",current.texture);
                    return;
                }
   
                const frameData             = new AnimationFrameData();
                frameData.texture           = texture;
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

        collection.push(anim);
    }

    return collection;
}

function animationDone(notification:INotification){
    const frameIndex:number = notification.getPayload() as number;
    if( frameIndex === rawl.getCurrentAnimation().getLastFrameIndex()){
        rawl.getCurrentAnimation().unsubscribe("PLAY_FRAME", animationDone); 
        update("done");
    }
}

function update(action:string):void{
    
    const last = fsm.getCurrentState();
    fsm.dispatch(action, Date.now());
    const current = fsm.getCurrentState();

    if( current === last)
        return;

    rawl.setCurrentAnimation( fsm.getCurrentState().data.animation );
    rawl.getCurrentAnimation().subscribe("PLAY_FRAME", animationDone);
    rawl.getCurrentAnimation().loop = current.data.loop === true;

    visualizer.drawFSM(fsm);
}

function keyHandler(event:KeyboardEvent):void{
    switch( event.key.toLowerCase() ){
        case "a": update("A"); break;
        case "z": update("Z"); break;
        case "e": update("E"); break;
        case "k": update("K"); break;
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

    // add fsm visualizer
    stage.addChild(visualizer);
    visualizer.x = 768;
    visualizer.y = 512;
    
    // start render loop
    render();

    // ad animations
    const config:any = manager.get("config");
    const animationsData = config.animations.map( 
        (c)=>{
            return buildAnimationData(c.base,c.angle,c.framestep,c.end,c.loop);
        }
    )

    const animations = createAnimations(animationsData);

    rawl = new Character(); 
    rawl.x = rawl.y = 256;
    rawl.setAnimations(animations);
    rawl.setCurrentAnimation("stand_idle");
    stage.addChild(rawl); 

    
    config.fsm.forEach( 
        (state)=>{
            fsm.addState(state as IState);
        }
    );

    fsm.setCurrentState( fsm.getStateById("stand_idle"), Date.now() );
    visualizer.drawFSM(fsm);


    window.addEventListener("keyup", keyHandler);
}

window.addEventListener("load", preload);
