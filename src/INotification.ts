import { IEmitter } from "./IEmitter";

export interface INotification{
    getEventType():string;
    getEmitter():IEmitter;
    getPayload():any;
}