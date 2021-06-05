import { Agent } from "./Agent";

export class Environment{

    private agents:Agent[] = [];
    public searched:string = "hello world";

    constructor(){
        while( this.agents.length < 100 ){
            this.agents.push( Agent.createRandomAgent(this.searched.length));
        }
    }

    public evaluate():void{
        for( let i:number = 0; i < this.agents.length; i++ ){
            const agent:Agent = this.agents[i];
            agent.note = 0;

            for( let j:number = 0; j < this.searched.length; j++ ){
                if( agent.solution.charAt(j) === this.searched.charAt(j ))
                    agent.note++;
            }
        }

        this.agents = this.agents.sort( 
            (a:Agent, b:Agent) => {
                if( a.note > b.note )
                    return -1;
                else 
                    return 1;
            }
        );
    }


    public next():void{
        this.evaluate();
        const pos:number = Math.floor(this.agents.length / 10);
        const best:Agent[] = this.agents.slice(0, pos);
        const results:Agent[] = []; 


        let i:number = 0;
        while( results.length < 90 ){
            if( i > best.length - 2 ){
                i = 0;
            }
            const current = best[i]; 
            const next = best[i+1];
            i+=2;

            const babies:Agent[] = current.doBabies(next);
            results.push( ...babies );
        }

        results.push( ...best );
        this.agents = results;
    }

    public getAgents():Agent[]{
        return this.agents;
    }


}