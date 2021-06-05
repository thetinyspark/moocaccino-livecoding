export class Agent{

    public solution:string  = ""; 
    public note:number      = 0;


    private static getRandomAuthorized():string{
        const str:string = "abcdefghijklmnopqrstuvwxyz "; 
        const pos:number = Math.floor(Math.random() * str.length);
        return str.charAt(pos);
    }

    public static createRandomAgent( param_length:number ):Agent{
        let solution:string = ""; 

        for( let i:number = 0; i < param_length; i++ ){
            solution += Agent.getRandomAuthorized();
        }

        return new Agent(solution, 1);
    }
    
    
    constructor( param_message:string, ratio:number = 0.8 ){
        this.solution = param_message;
        const rand:number = Math.random();

        if( rand > ratio ){
            const pos:number = Math.floor(Math.random() * this.solution.length);
            const randomChar:string = Agent.getRandomAuthorized();
            const sol:string[] = this.solution.split("");
            sol[pos] = randomChar;
            this.solution = sol.join("");
        }
    }


    public doBabies(param_partner:Agent ):Agent[]{
        const myMiddle:number = Math.floor(this.solution.length / 2);
        const firstMid:string = this.solution.substr(0, myMiddle );
        const secondMid:string = this.solution.substr(myMiddle); 

        const partnerMiddle:number = Math.floor(param_partner.solution.length / 2);
        const partnerFirstMid:string = param_partner.solution.substr(0, partnerMiddle );
        const partnerSecondMid:string = param_partner.solution.substr(partnerMiddle); 

        const a:Agent = new Agent(firstMid + partnerSecondMid);
        const b:Agent = new Agent(secondMid + partnerFirstMid);

        const c:Agent = new Agent(firstMid + partnerFirstMid);
        const d:Agent = new Agent(secondMid + partnerSecondMid);

    
        const results:Agent[] = [a,b,c,d];

        return results;
    }

}