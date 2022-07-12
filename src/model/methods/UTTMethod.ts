import AbstractVotingMethod from "./AbstractVotingMethod";
import CandidateData from "../schema/CandidateData";

export default class UTTMethod extends AbstractVotingMethod{

    constructor(){
        super();
    }

    voteForFirstCandidateAlive(choices){
        for( let i = 0; i < choices.length; i++ ){
            const choice = choices[i];
            const candidate = this.getCandidateById(choice.id);
            if( candidate === null || candidate.alive === false )
                continue;

            candidate.score++;
            return;
        }
    }
    
    compute(){

        if( this.getCurrentTour() > 1 ){
            console.log("le vainqueur est", this.getAlivesCandidates()[0].name);
            return;
        }

        this.resetScore();

        this.getData().votes.forEach( 
            (vote)=>{
                this.voteForFirstCandidateAlive(vote.choices);
            }
        );

        this.sortCandidates();

        this.getData().candidates.forEach( 
            (candidate:CandidateData, index)=>{
                if( this.getCurrentTour() === 0 )
                    candidate.alive = index < 2;
                else
                    candidate.alive = index < 1;
            }
        );

        this.nextTour();
    }
}