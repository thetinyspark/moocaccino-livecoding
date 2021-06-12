export interface IWarrior{
    atk(opponent:IWarrior):void;
    hit(amount:number):void;
    get life():number; 
    get isDead():boolean;
    get name():string;
}

// workaround possible avec abstract class pure, mais nécessite un héritage 
// plutôt qu'une implémentation

// export abstract class AbstractWarrior{
//     abstract  atk(opponent:IWarrior):void;
//     abstract  hit(amount:number):void;
//     abstract  get life():number; 
//     abstract  get isDead():boolean;
//     abstract  get name():string;
// }

export const IWarriorDIToken:string = "IWarriorDIToken";