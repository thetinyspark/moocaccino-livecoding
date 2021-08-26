import { IDisplayable } from "./IDisplayable";
export declare class Actor implements IDisplayable {
    texture: any;
    row: number;
    col: number;
    x: number;
    y: number;
    render(context: CanvasRenderingContext2D): void;
}
