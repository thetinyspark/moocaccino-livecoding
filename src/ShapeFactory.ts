export default class ShapeFactory{
    
    private static _patterns:any = {};

    public static loadPatterns(patterns:any){
        this._patterns = patterns;
    }

    public static getPatternKeys():string[]{
        return Object.keys( this._patterns );
    }

    public static prompt(){
        const keys = this.getPatternKeys();
        const msg = "Choose your pattern:\r\n" + keys.join("\r\n");
        const patternName = window.prompt(msg);

        const msg2 = `from row:`;
        const fromRow = window.prompt(msg2);

        const msg3 = `from col:`;
        const fromCol = window.prompt(msg3);


        return this.create(patternName, parseInt(fromRow), parseInt(fromCol));
    }

    public static create(name:string, fromRow:number, fromCol:number):{row:number, col:number}[]{
        const pattern = this._patterns[name]; 
        if( pattern === undefined )
            return [];

        return pattern.map( 
            (coords)=>{
                return {row: coords.row + fromRow, col: coords.col + fromCol };
            }
        );
    }
}