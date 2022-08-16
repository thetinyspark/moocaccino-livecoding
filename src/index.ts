import {Animation, AssetsManager, FiniteStateMachine, IMAGE_TYPE, INotification, IState, JSON_TYPE, MouseControl, Stage, Stats} from "@thetinyspark/moocaccino-barista";
import AnimationFrameData from "@thetinyspark/moocaccino-barista/dist/core/display/AnimationFrameData";
import buildAnimationData from "./buildAnimationData";
import Character from "./Character";
import FSMVisualizer from "./FSMVisualizer";
import GraphicManager from "./GraphicManager";
import TextField from "./TextField";
// render loop

let stage:Stage = null;
let stats:Stats = null;
let rawl:Character = null;
const fsm = new FiniteStateMachine(); 
const visualizer = new FSMVisualizer();
const timeField:TextField = new TextField(100,50);

function render(){
    fsm.setTime(Date.now());
    stage.nextFrame();
    timeField.setText(fsm.getElapsedTime().toString()+"ms");
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

function createAnimations(config:any):Animation[]{

    const animations = config.animations.map( 
        (c)=>{
            return buildAnimationData(c.base,c.angle,c.framestep,c.end,c.loop);
        }
    )

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

function addFSMVisualizer(){
    // add fsm visualizer
    stage.addChild(visualizer);
    visualizer.x = 600;
    visualizer.y = 100;
    visualizer.drawFSM(fsm);
    visualizer.subscribe("doAction", actionHandler);
}

function addMouseControl(){
    // add mouse controls
    const controls = new MouseControl(stage);
    controls.activate();
}

function addFSM(config:any){
    // add states on fsm
    config.fsm.forEach( 
        (state)=>{
            fsm.addState(state as IState);
        }
    );

    fsm.setTime(Date.now());
    fsm.setCurrentState( fsm.getStateById("stand_idle"));
    fsm.subscribe(FiniteStateMachine.ON_COMPLETE_ACTION, actionHandler);
}

function addCharacter(animations:Animation[]):void{
    rawl = new Character(); 
    rawl.x = 50;
    rawl.y = 100;
    rawl.setAnimations(animations);
    rawl.setCurrentAnimation("stand_idle");
    stage.addChild(rawl); 
}

function update(action:string):void{
    const last = fsm.getCurrentState();
    fsm.dispatch(action);
    const current = fsm.getCurrentState();

    if( current === last)
        return;

    rawl.setCurrentAnimation( fsm.getCurrentState().data.animation );
    rawl.getCurrentAnimation().loop = current.data.loop === true;

    visualizer.drawFSM(fsm);
}

function actionHandler(notification:INotification):void{
    update( notification.getPayload() as string );
}

function start(manager:AssetsManager){

    // init texture manager
    GraphicManager.getInstance().reset(manager);

    // create the scene/stage, note: Stage inherits from DisplayObjectContainer
    stage = new Stage();
    
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

    // ad animations
    const config:any = manager.get("config");
    const animations = createAnimations(config);

    addCharacter(animations);
    addFSM(config);
    addFSMVisualizer();
    addMouseControl();

    // timefield
    stage.addChild(timeField);
    timeField.x = 550;

    // start render loop
    render();
}

window.addEventListener("load", preload);
