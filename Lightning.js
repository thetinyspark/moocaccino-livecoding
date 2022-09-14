class Lightning{
    constructor(){
        this.childrenGap        = 0.9;
        this.alpha              = 1;
        this.worldAlpha         = 1;
        this.startAngle         = 90;
        this.minAngle           = -45; 
        this.maxAngle           = 225;
        this.radiusRange        = {min: 20, max: 35}; 
        this.angleRange         = {min: -20, max: 20}; 
        this.start              = {x: 0, y: 0};
        this.shadowColor        = "white"; 
        this.color              = "white"; 
        this.lineCap            = "round";
        this.numPoints          = 50; 
        this.shadowThickness    = 20; 
        this.thickness          = 4; 
        this.points             = [];
    }

    _drawPoints(context, max = 0){
        context.save();
        context.strokeStyle     = this.color;
        context.lineCap         = this.lineCap;
        context.lineWidth       = this.thickness;
        context.shadowColor     = this.shadowColor;
        context.shadowBlur      = this.shadowThickness;
        context.globalAlpha     = ( this.alpha * this.worldAlpha ) < 0 ? 0 : ( this.alpha * this.worldAlpha);
        context.shadowOffsetX   = 0;
        context.shadowOffsetY   = 0;
        context.beginPath();

        const maxi = Math.min(this.points.length-1, max);

        
        for(let i = 0; i <= maxi; i++){
            const current = this.points[i];

            if( i === 0 ){
                context.moveTo(current.x, current.y);
            }
            else{
                context.lineTo(current.x, current.y);
            }
        }

        context.stroke();
        context.closePath();
        context.restore();
    }

    _drawChildren(context, max){
        for( let i = 0; i < this.points.length; i++ ){
            const current = this.points[i]; 
            if( current.child !== null ){
                current.child.worldAlpha = this.worldAlpha;
                const frame = Math.max( max - i , 0 );
                current.child.draw(context, frame );
            }
        }
    }

    draw(context, max){
        this._drawPoints(context, max); 
        this._drawChildren(context, max);
    }

    build(){
        let x               = this.start.x; 
        let y               = this.start.y; 
        let steps           = this.numPoints; 
        const angleRange    = this.angleRange;
        const radiusRange   = this.radiusRange;
        let angle           = this.startAngle; 

        this.points = [];
        this.points.push({x:x,y:y, child:null});
    
        for( let i = 0; i < steps; i++ ){
            const newAngle = angleRange.min + Math.random() * ( angleRange.max - angleRange.min );
            const newRadius = radiusRange.min + Math.random() * ( radiusRange.max - radiusRange.min );
            angle += newAngle;

            angle = angle > this.maxAngle ? this.maxAngle : angle;
            angle = angle < this.minAngle ? this.minAngle : angle;

            x += Math.round( Math.cos(angle * Math.PI / 180) * newRadius );
            y += Math.round( Math.sin(angle * Math.PI / 180) * newRadius );

            this.points.push({x, y, child:null});
        }

        this.createRandomChildren(this.childrenGap);
    }

    clone(){
        const bolt              = new Lightning();
        bolt.worldAlpha         = this.worldAlpha;
        bolt.minAngle           = this.minAngle;
        bolt.maxAngle           = this.maxAngle;
        bolt.childrenGap        = this.childrenGap;
        bolt.startAngle         = this.startAngle;
        bolt.alpha              = this.alpha;
        bolt.radiusRange        = this.radiusRange ;
        bolt.angleRange         = this.angleRange ;
        bolt.start              = this.start ;
        bolt.numPoints          = this.numPoints ;
        bolt.shadowColor        = this.shadowColor ;
        bolt.shadowThickness    = this.shadowThickness ;
        bolt.color              = this.color ;
        bolt.thickness          = this.thickness ;
        bolt.lineCap            = this.lineCap;
        return bolt;
    }

    createRandomChildren(){
        for( let i = 1; i < this.points.length - 1; i++ ){
            if( Math.random() > this.childrenGap){
                const root              = this.points[i];
                const bolt              = this.clone();
                root.child              = bolt;

                bolt.points             = [];
                bolt.start.x            = root.x;
                bolt.start.y            = root.y;
                bolt.numPoints          = Math.round( this.numPoints / 1.5 ); 
                bolt.radiusRange.min    = Math.round( this.radiusRange.min / 2 );
                bolt.radiusRange.max    = Math.max( this.radiusRange.max / 2, 2);
                bolt.thickness          = Math.round(this.thickness / 2);
                bolt.alpha              = this.alpha / 2;
                bolt.childrenGap        = this.childrenGap + 0.05;
                bolt.build();
            }
        }
    }
}