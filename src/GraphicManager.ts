import { AssetsManager, Texture } from "@thetinyspark/moocaccino-barista";

export default class GraphicManager{

    private _textures:Texture[] = [];
    private static _instance:GraphicManager = null; 
    public static getInstance():GraphicManager{
        if( GraphicManager._instance === null )
            GraphicManager._instance = new GraphicManager();

        return GraphicManager._instance;
    }

    reset(manager:AssetsManager){
        const png = manager.get("spritesheet_img");
        const json = manager.get("spritesheet_json");
        const zones = json.zones.map( 
            (zone)=>{
                return {
                    sx: zone.x,
                    sy: zone.y, 
                    sw: zone.width, 
                    sh: zone.height, 
                    id: zone.id
                }
            }
        );
        

        const mainTexture = Texture.createFromSource("mainTexture", png);
        this._textures = mainTexture.createSubTextures(zones);
    }

    getTextureById(id:string):Texture|null{
        return this._textures.find( tex => tex.id === id) || null;
    }
}