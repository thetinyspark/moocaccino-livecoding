import { DisplayObjectContainer, FiniteStateMachine } from "@thetinyspark/moocaccino-barista";
import TextField from "./TextField";

export default class FSMVisualizer extends DisplayObjectContainer{
    constructor(){
        super();
    }

    drawFSM(fsm:FiniteStateMachine): void {
        this.removeChildren(); 
        const state = fsm.getCurrentState();
        if( state === null ){
            return;
        }

        const currentField = new TextField(300,50);
        currentField.setText(state.id,  "white", "1rem Arial", "center", 150,"#333333");
        this.addChild(currentField);

        const numStates = state.actions.length;
        const totalHeight = numStates * 75;

        state.actions.forEach( 
            (action, index:number)=>{
                const nameField = new TextField(300,50);
                const actionField = new TextField(50,50);

                actionField.y = nameField.y = -(totalHeight>>1) + (index * 75);
                nameField.x = 460;
                actionField.x = 400;
                nameField.setText( action.target, "white", "1rem Arial", "center", 150, "green");
                actionField.setText(action.name, "white", "1rem Arial", "center", 25, "red");
                this.addChild(nameField);
                this.addChild(actionField);
            }
        );
    }
}