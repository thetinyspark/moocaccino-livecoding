import AbstractVotingMethod from "./AbstractVotingMethod";
import CandidateData from "../schema/CandidateData";

export default class CondorcetMethod extends AbstractVotingMethod{

    constructor(){
        super();
    }

    makeDuals(){
        const cache:any = {};
        const candidates = this.getData().candidates;
        candidates.forEach( 
            (candidateA)=>{
                candidates.forEach( 
                    (candidateB)=>{
                        const id1 = candidateA.id;
                        const id2 = candidateB.id;
                        const left = Math.min(id1, id2);
                        const right = Math.max(id1, id2);
                        const key = left+"_"+right;
                        if( cache[key] === undefined ){
                            cache[key] = this.dualBetween(candidateA, candidateB);
                        }
                    }
                )        
            }
        );
    }

    dualBetween(candidateA:CandidateData, candidateB:CandidateData){
        if( candidateA.id === candidateB.id )
            return;

        
        const votes = this.getData().votes;
        let sumA:number = 0;
        let sumB:number = 0;
        votes.forEach(
                (vote)=>{
                    const ids = vote.choices.map( v => v.id); 
                    const posA = ids.indexOf(candidateA.id);
                    const posB = ids.indexOf(candidateB.id);
                    if( posA < posB )
                        sumA++;
                    else
                        sumB++;
                }
        ); 

        console.log(candidateA.name, sumA, "VS", candidateB.name, sumB);

        if( sumA > sumB ){
            candidateA.score++;
            return candidateA.id;
        }
        else if( sumA < sumB ){
            candidateB.score++;
            return candidateB.id;
        }
        else{
            return -1;
        }
    }
    
    compute(){
        if( this.getAlivesCandidates().length === 1 ){
            console.log("le vainqueur est", this.getAlivesCandidates()[0].name);
            return;
        }

        this.resetScore();
        this.makeDuals();
        this.sortCandidates();

        const scores = this.getData().candidates.map( cdt => cdt.score);
        const maxScore = Math.max(...scores);
        const minScore = Math.min(...scores);

        if( maxScore !== minScore ){
            const alives = this.getAlivesCandidates();
            alives[alives.length-1].alive = false;
        }

        this.nextTour();
    }
}