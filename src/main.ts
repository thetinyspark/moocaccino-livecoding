import {Agent} from "./Agent"; 
import { Environment } from "./Environment";

const env:Environment = new Environment();

function nextGeneration(num:number = 0){
    env.next();
    env.evaluate();
    const agents:Agent[] = env.getAgents();
    if( agents[0].note === 11 ){
        console.log("c'est gagné ! generation:" + num);
    }
    else{
        console.log("note courante: " + agents[0].note);
        setTimeout( 
            () =>  {
                nextGeneration(num+1);
            }, 
            100
        )
    }
}

nextGeneration();
