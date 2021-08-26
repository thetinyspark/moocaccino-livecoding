export enum AssetType {
    JSON = 1, 
    IMAGE = 2
}

export type Asset = {
    key: string,
    type: AssetType,
    uri: string,
    data: any
}


export class AssetsManager {

    private static instance: AssetsManager = null;
    private static token: string = "secret";

    private _queue: Asset[] = [];

    public static getInstance(): AssetsManager {
        if (AssetsManager.instance === null)
            AssetsManager.instance = new AssetsManager(AssetsManager.token);

        return AssetsManager.instance;
    }

    private constructor(token: string) {
        if (token !== AssetsManager.token)
            throw (new Error("singleton error, use getInstance static method instead of new operator"));
    }


    public queue(key: string, uri: string, type: AssetType): void {
        this._queue.push(
            {
                key: key,
                uri: uri,
                type: type,
                data: null
            }
        );
    }

    public getAssets():Asset[]{
        return this._queue;
    }

    public getAssetByKey(key:string):Asset|null{
        return this._queue.find( 
            (value:Asset) => {
                return value.key === key;
            }
        ) || null;
    }

    public async load(): Promise<Asset[]> {

        for (let i: number = 0; i < this._queue.length; i++) {
            const current:Asset     = this._queue[i];
            const response          = await fetch(current.uri);

            switch(current.type){
                case AssetType.IMAGE: 
                    const raw:Blob              = await response.blob();
                    const base64:string         = URL.createObjectURL(raw); 
                    const img:HTMLImageElement  = document.createElement("img");
                    img.src                     = base64;
                    current.data                = img;
                    break; 

                case AssetType.JSON: 
                    const json:any              = await response.json(); 
                    current.data                = json;
                    break;

            }
        }

        return this._queue;
    }

}