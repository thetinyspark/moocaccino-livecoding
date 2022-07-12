import AbstractVotingMethod from "./AbstractVotingMethod";
import CandidateData from "../schema/CandidateData";

export default class BordaMethod extends AbstractVotingMethod{

    constructor(){
        super();
    }

    voteForAllCandidates(choices){
        return choices.forEach( 
            (choice:{id:number, note:number})=>{
                const candidate = this.getCandidateById(choice.id);

                if( candidate === null || candidate.alive === false )
                    return null;

                candidate.score += choice.note;
            }
        );
    }
    
    compute(){
        if( this.getCurrentTour() > 1 ){
            console.log("le vainqueur est", this.getAlivesCandidates()[0].name);
            return;
        }

        this.resetScore();

        this.getData().votes.forEach( 
            (vote)=>{
                this.voteForAllCandidates(vote.choices);
            }
        );

        this.sortCandidates();

        this.getData().candidates.forEach( 
            (candidate:CandidateData, index)=>{
                if( this.getCurrentTour() === 1 )
                    candidate.alive = index < 1;
                else
                    candidate.alive = index < 2;
            }
        );

        this.nextTour();
    }
}