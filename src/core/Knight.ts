import { IWarrior } from "./IWarrior";

export class Knight implements IWarrior{

    private _life:number = 200;
    private _name:string = "";

    constructor(name:string){
        this._name = name;
    }

    get life():number{
        return this._life;
    }

    get isDead():boolean{
        return this._life <= 0;
    }

    get name():string{
        return this._name;
    }

    public hit(amount:number):void{
        this._life -= amount;
    }

    public atk(opponent:IWarrior):void{
        console.log(this.name, " / ", opponent.name);
        
        const bonus:number = Math.round( Math.random() * 6 );
        opponent.hit(12 + bonus);
    }
}