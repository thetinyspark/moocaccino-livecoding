import { Animation, AssetsManager, CanvasUtils, Spritesheet, Texture, TextureData } from "@thetinyspark/moocaccino-barista";

export default class GraphicManager{

    private static _instance:GraphicManager = null; 
    private _textures:Texture[] = [];
    private _redTex:Texture = null;
    private _blueTex:Texture = null;
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

    getRed():Texture{
        if( this._redTex === null){
            const red = CanvasUtils.create(100,100);
            CanvasUtils.fillRect(red, "red", 0, 0, 100, 100);
            this._redTex = Texture.createFromSource("red",red);
        }

        return this._redTex;
    }

    getBlue():Texture{
        if( this._blueTex === null){
            const blue = CanvasUtils.create(100,100);
            CanvasUtils.fillRect(blue, "blue", 0, 0, 100, 100);
            this._blueTex = Texture.createFromSource("blue",blue);
        }

        return this._redTex;
    }

    getTextureById(id:string):Texture|null{
        return this._textures.find( tex => tex.id === id) || null;
    }

    getPacmanAnimation(direction:"left"|"top"|"bottom"|"right"):Animation{
        const anim = Animation.createFromTexturesAndFrames(
            [
                {
                    frame:0, 
                    texture: this.getTextureById(`pacman_${direction}_1`)
                },
                {
                    frame:30, 
                    texture: this.getTextureById(`pacman_${direction}_2`)
                },
                {
                    frame:60, 
                    texture: this.getTextureById(`pacman_${direction}_2`)
                },
            ]
        );

        anim.loop = true;
        return anim;
    }

    getGhostAnimation(color: "red"|"cyan"|"pink"|"orange", direction:"left"|"top"|"bottom"|"right"):Animation{
        const anim = Animation.createFromTexturesAndFrames(
            [
                {
                    frame:0, 
                    texture: this.getTextureById(`${color}_${direction}_1`)
                },
                {
                    frame:30, 
                    texture: this.getTextureById(`${color}_${direction}_2`)
                },
                {
                    frame:60, 
                    texture: this.getTextureById(`${color}_${direction}_2`)
                },
            ]
        );

        anim.loop = true;
        return anim;
    }
}