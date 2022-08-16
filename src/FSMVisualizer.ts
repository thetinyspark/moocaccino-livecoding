import { DisplayObjectContainer, FiniteStateMachine, INotification } from "@thetinyspark/moocaccino-barista";
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

        state.actions.forEach( 
            (action, index:number)=>{
                const nameField = new TextField(250,50);
                const actionField = new TextField(50,50);

                actionField.y = nameField.y = 100 + (index * 75);
                nameField.x = 60;
                actionField.x = 0;
                nameField.setText( action.target, "white", "1rem Arial", "center", 125, "green");
                actionField.setText(action.name, "white", "1rem Arial", "center", 25, "red");
                this.addChild(nameField);
                this.addChild(actionField);
                actionField.name = action.name;

                actionField.subscribe(
                    "MOUSE_CONTROL_CLICK", 
                    (notification:INotification)=>{
                        const field:TextField = notification.getEmitter() as TextField;
                        this.emit( "doAction", field.name );
                    }
                );
            }
        );
    }
}