import { PathFinder } from "./pathfinding/PathFinder";
import { Renderer } from "./view/Renderer";
import { Map } from "./Map";
import { AssetsManager } from "./assets/AssetsManager";
import { ASSETS_LISTS, CELL_SIZE } from "./config/Config";
import { Log, LogType } from "./pathfinding/Log";
import { CLOSED, Node, OPENED, RETAINED } from "./pathfinding/Node";
import { Actor } from "./view/Actor";
import { FastFinder } from "./pathfinding/FastFinder";

const manager: AssetsManager    = AssetsManager.getInstance();
const finder                    = new PathFinder();
const fast                      = new FastFinder();
const renderer                  = new Renderer();
const map: Map                  = new Map();
let logs: Log[]                 = [];
let solution: Node[]            = [];


function showSolution(solution:Node[]){
    solution.forEach( 
        (value:Node) => {
            const node:Node = renderer.getFloorByCoords(value.row, value.col).getModel();
            node.state = RETAINED;
        }
    ); 
}

function nextLog() {
    if (logs.length === 0)
        return;

    const currentLog: Log = logs.shift();
    const target = currentLog.target;
    const heroe: Actor = renderer.getHeroe();


    switch (currentLog.type) {
        
        case LogType.SET_CURRENT_NODE:
            heroe.row = target.row;
            heroe.col = target.col;
            break;

        case LogType.ADD_TO_OPEN_LIST:
            renderer.getFloorByCoords(target.row, target.col).getModel().state = OPENED;
            break;

        case LogType.ADD_TO_CLOSE_LIST:
            renderer.getFloorByCoords(target.row, target.col).getModel().state = CLOSED;
            break;

        case LogType.RECALC_VALUES:
            const node:Node =renderer.getFloorByCoords(target.row, target.col).getModel();
            node.g = target.g;
            node.f = target.f;
            node.h = target.h;
            break;
        

        case LogType.COMPLETE: 
            showSolution(solution); 
            break;

            
    }

    setTimeout( 
        () => {
            nextLog();
        }, 
        20
    )
}

async function preload(){
    window.removeEventListener("load", preload);
    ASSETS_LISTS.forEach((asset) => manager.queue(asset.key, asset.uri, asset.type));
    await manager.load();
    start();
}

async function start() {
    const canvas: HTMLCanvasElement     = document.getElementById("map") as HTMLCanvasElement;
    const width: number                 = window.screen.width;
    const height: number                = window.screen.height;
    const numRows: number               = width / CELL_SIZE;
    const numCols: number               = height / CELL_SIZE;

    // set actual map
    map.reset(numRows, numCols, 1, 1);
    canvas.width    = width;
    canvas.height   = height;

    /*
    // create copy and get result from virtual map
    const copy: Map = map.clone();
    const result    = finder.findPath(copy.getData(),copy.getStartNode(), copy.getEndNode() );
    logs            = result.logs;
    solution        = result.solution;
    setTimeout( 
        ()=>{
            nextLog();
        }, 
        3000
    );
    */

    

    // reset renderer
    renderer.reset(canvas, map);
    renderer.render();

    const solution:Node[] = fast.findPath(map.getData(), map.getStartNode(), map.getEndNode());
    console.log(solution);
    showSolution(solution);

    
}

window.addEventListener("load", preload);