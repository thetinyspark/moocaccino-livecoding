import { AssetsManager, Texture } from "@thetinyspark/moocaccino-barista";

export default class GraphicManager{

    private _textures:Texture[] = [];
    private _zones:any = [];
    private static _instance:GraphicManager = null; 
    public static getInstance():GraphicManager{
        if( GraphicManager._instance === null )
            GraphicManager._instance = new GraphicManager();

        return GraphicManager._instance;
    }

    reset(manager:AssetsManager){
        for( let i = 0; i < 5; i++ ){
            const png = manager.get("spritesheet_img_"+i);
            const json = manager.get("spritesheet_json_"+i);
            const zones = json.zones.map( 
                (zone)=>{
                    const current = {
                        ...zone,
                        sx: zone.x,
                        sy: zone.y, 
                        sw: zone.width, 
                        sh: zone.height, 
                    }

                    this._zones.push(current)
                    return current;
                }
            );
            const mainTexture = Texture.createFromSource("mainTexture_"+i, png);
            this._textures.push( ...mainTexture.createSubTextures(zones) );
        }

        console.log(this._textures.length, "textures");
    }

    getZoneById(id:string):any|null{
        return this._zones.find( (z) => z.id === id ) || null;
    }

    getTextureById(id:string):Texture|null{
        return this._textures.find( tex => tex.id === id) || null;
    }
}