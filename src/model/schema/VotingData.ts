import CandidateData from "./CandidateData"

export default class VotingData{
    public candidates:CandidateData[]
    public votes:{id:number,choices:{id:number, note:number}[]}[]
}