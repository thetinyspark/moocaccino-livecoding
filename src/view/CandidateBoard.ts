import { DisplayObjectContainer } from "@thetinyspark/moocaccino-barista";
import CandidateData from "../model/schema/CandidateData";
import VotingData from "../model/schema/VotingData";
import Candidate from "./Candidate";

export default class CandidateBoard extends DisplayObjectContainer{
    
    private _data:VotingData;
    private _candidates:Candidate[] = [];

    constructor(){
        super();
    }
    
    reset(data:VotingData){
        this.removeChildren();
        this._data = data;
        this._candidates = [];

        this._data.candidates.forEach( 
            (candidate, index )=>{
                const rows = Math.floor(index / 3); 
                const cols = index % 3;

                const vcandidate = new Candidate(candidate);
                vcandidate.y = rows * 230;
                vcandidate.x = cols * 330;

                this._candidates.push(vcandidate);
                this.addChild(vcandidate);
                return;
            }
        );
    }

    updateCandidates(candidates:CandidateData[]){
        candidates.forEach( 
            (data:CandidateData)=>{
                this.getCandidateViewById(data.id).updateInfo(data);
            }
        )
    }

    getCandidateViewById(id:number):Candidate{
        return this._candidates.find( vcand => vcand.getId() === id) || null;
    }
}