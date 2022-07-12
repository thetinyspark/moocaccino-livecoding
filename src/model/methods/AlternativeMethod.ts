import AbstractVotingMethod from "./AbstractVotingMethod";

export default class AlternativeMethod extends AbstractVotingMethod{

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
        if( this.getAlivesCandidates().length === 1 ){
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

        const alives = this.getAlivesCandidates();
        alives[alives.length-1].alive = false;

        this.nextTour();
    }
}