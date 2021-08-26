import { CELL_SIZE } from "../config/Config";
import { IDisplayable } from "./IDisplayable";

export class Actor implements IDisplayable {

    public texture = null;
    public row:number = 0;
    public col:number = 0;
    public x:number = 0;
    public y:number = 0;

    public render(context: CanvasRenderingContext2D) {
        if (this.texture === null)
            return;

        const x:number = this.row * CELL_SIZE;
        const y:number = this.col * CELL_SIZE;
        this.x += ( x - this.x ) * 0.1;
        this.y += ( y - this.y ) * 0.1;

        context.save();
        context.translate(this.x, this.y);
        context.drawImage(this.texture, 0, 0, CELL_SIZE, CELL_SIZE);
        context.restore();
    }
}