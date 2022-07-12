import CandidateData from "../schema/CandidateData";
import VotingData from "../schema/VotingData";

export default abstract class AbstractVotingMethod{

    private _data:VotingData;
    private _numTours:number = 0;

    constructor(){
    }

    getCandidatesByChoices(choices):CandidateData[]{
        return choices.map( 
            (choice:{id:number, note:number})=>{
                const candidate = this.getCandidateById(choice.id);

                if( candidate === null || candidate.alive === false )
                    return null;

                return candidate;
            }
        ).filter(
            (candidate)=>{
                return candidate !== null;
            }
        );
    }

    sortCandidates(){
        this.getData().candidates = this.getData().candidates.sort( 
            (a:CandidateData, b:CandidateData)=>{
                return a.score > b.score ? -1 : 1;
            }
        );
    }

    getAlivesCandidates():CandidateData[]{
        return this.getData().candidates.filter( 
            (val)=> val !== null && val.alive === true
        );
    }

    getCandidateById(id:number):CandidateData|null{
        return this.getAlivesCandidates().find( 
            (candidate:CandidateData)=>{
                return candidate.id === id;
            }
        ) || null;
    }

    resetScore(){
        this.getData().candidates.forEach( 
            (candidate)=>{
                candidate.score = 0;
            }
        );
    }

    reset(){
        this.getData().candidates.forEach( 
            (candidate)=>{
                candidate.score = 0;
                candidate.alive = true;
            }
        );

        this._numTours = 0;
    }

    getCurrentTour(){
        return this._numTours;
    }

    nextTour(){
        this._numTours++;
    }

    setData(data:VotingData){
        this._data = data;
    }

    getData():VotingData{
        return this._data;
    }
    
    compute(){}
}