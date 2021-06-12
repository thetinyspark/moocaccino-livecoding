import { IWarriorDIToken } from "./core/IWarrior";
import { Knight } from "./core/Knight";
import { Container } from "./di/Container";

let id:number = 0;

Container.register(
    IWarriorDIToken, 
    ()=>{
        return new Knight("arthur_" + id++ );
    }
);