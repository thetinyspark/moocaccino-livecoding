import AbstractVotingMethod from "../methods/AbstractVotingMethod";
import AlternativeMethod from "../methods/AlternativeMethod";
import CondorcetMethod from "../methods/CondorcetMethod";
import BordaMethod from "../methods/BordaMethod";
import UTTMethod from "../methods/UTTMethod";

export default class VotingMethodFactory{
    resolve(key:string):AbstractVotingMethod{
        switch(key){
            case "utt": return new UTTMethod();
            case "brd": return new BordaMethod();
            case "alt": return new AlternativeMethod();
            case "cdr": return new CondorcetMethod();
        }
        return new UTTMethod();
    }
}