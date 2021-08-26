import { Node } from "./Node";
export declare class Log {
    parent?: Node;
    target: Node;
    type: string;
    constructor();
}
export declare enum LogType {
    ADD_TO_CLOSE_LIST = "ADD_TO_CLOSE_LIST",
    ADD_TO_OPEN_LIST = "ADD_TO_OPEN_LIST",
    SET_CURRENT_NODE = "SET_CURRENT_NODE",
    SET_PARENT_NODE = "SET_PARENT_NODE",
    RECALC_VALUES = "RECALC_VALUES",
    COMPLETE = "COMPLETE"
}
