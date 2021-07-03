export class Node<T>{

    private _left:Node<T>|null = null;
    private _right:Node<T>|null = null;
    private _limit:number = 32;
    private _min:number = -1;
    private _max:number = -1;
    private _values:T[] = []; 
    private _maxDepth:number = 12;
    private _property:string = "";
    public depth:number = 0;
    public name:string = "";

    constructor( min:number, max:number, property:string){
        this._min = min; 
        this._max = max; 
        this._property = property;
    }

    public isLeaf():boolean{
        return this._left === null && this._right === null;
    }

    public getLeft():Node<T>|null{
        return this._left;
    }

    public getRight():Node<T>|null{
        return this._right;
    }
    
    private _split():void{
        const pivot:number = this.getPivot();
        this._left = new Node<T>(this._min, pivot, this._property);
        this._right = new Node<T>(pivot, this._max, this._property);
        this._left.depth = this.depth + 1;
        this._right.depth = this.depth + 1;
        this._left.name = this.name + "_left_";
        this._right.name = this.name + "_right_";

        while( this._values.length > 0 ){
            this.dispatch( this._values.shift() as T);
        }
    }

    private dispatch(value:T):void{
        const pivot:number = this.getPivot();
        if( (value as any)[this._property] <= pivot){
            this._left?.add(value);
        }
        else{
            this._right?.add(value);
        }
    }

    public getPivot():number{
        return this._min + ( ( this._max - this._min )  / 2);
    }

    public search( minAge:number, maxAge:number ):T[]{
        let results:T[] = [];
        const pivot:number = this.getPivot();
        if( !this.isLeaf() ){
            if( minAge <=  pivot)
                results = results.concat( this._left?.search(minAge, maxAge ) as T[]);

            if( maxAge > pivot)
                results = results.concat( this._right?.search(minAge, maxAge ) as T[]);
        }
        else{
            this._values.forEach( 
                (value:T)=>{
                    if( 
                        (value as any)[this._property] >= minAge && 
                        (value as any)[this._property] <= maxAge 
                    ){
                        results.push( value );
                    }
                }
            )
        }

        return results;
    }

    public add(value:T):void{
        if( this.isLeaf() ){
            this._values.push(value);
            if( this._values.length > this._limit && this.depth + 1 <= this._maxDepth)
                this._split();
        }
        else{
            this.dispatch(value);
        }
    }

    public getValues():T[]{
        return this._values;
    }

    public toString(){
   
        let tabulations:string = ""; 
        let i:number = this.depth; 
        while (--i > -1){
            tabulations += "\t";
        }

        let left:string = tabulations + this._left?.toString() || "";
        let right:string = tabulations + this._right?.toString() || ""; 

        return `
        ${tabulations} NumValues: ${this._values.length}, 
        ${tabulations} Interval: [${this._min},  ${this._max}] 
        ${left}
        ${right}
        `;
    }

    public extract():T[]{
        if( this.isLeaf()){
            return this._values;
        }
        else{
            return this._left?.extract().concat(  this._right?.extract() as T[] ) as T[]
        }
    }
}