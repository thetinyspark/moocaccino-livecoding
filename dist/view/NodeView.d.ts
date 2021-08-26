import { Node } from "../pathfinding/Node";
import { IDisplayable } from "./IDisplayable";
export declare class NodeView implements IDisplayable {
    private _model;
    texture: any;
    row: number;
    col: number;
    setModel(node: Node): void;
    getModel(): Node;
    private drawInfo;
    private drawState;
    render(context: CanvasRenderingContext2D): void;
}
