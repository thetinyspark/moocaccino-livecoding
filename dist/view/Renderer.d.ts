import { Map } from "../Map";
import { Actor } from "./Actor";
import { NodeView } from "./NodeView";
export declare class Renderer {
    private map;
    private children;
    private canvas;
    private _heroe;
    private _chest;
    constructor();
    reset(canvas: HTMLCanvasElement, map: Map): void;
    render(): void;
    getHeroe(): Actor;
    getChest(): Actor;
    getFloorByCoords(row: number, col: number): NodeView;
}
