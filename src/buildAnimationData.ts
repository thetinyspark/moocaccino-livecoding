export default function buildAnimationData(base:string, angle:number, framestep:number, end:number, loop:boolean):any{
    const data:any = {}; 
    data.name = base; 
    data.framestep = framestep;
    data.loop = loop;
    data.frames = []; 
    for( let i:number = 1; i <= end; i+=framestep ){
        const numFrame = i < 10 ? "00"+i : ( i < 100 ) ? "0"+i : i;
        const texture = base+"_"+angle+"_"+numFrame;
        data.frames.push({texture});
    }
    return data;
}