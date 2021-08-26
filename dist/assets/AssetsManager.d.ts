export declare enum AssetType {
    JSON = 1,
    IMAGE = 2
}
export declare type Asset = {
    key: string;
    type: AssetType;
    uri: string;
    data: any;
};
export declare class AssetsManager {
    private static instance;
    private static token;
    private _queue;
    static getInstance(): AssetsManager;
    private constructor();
    queue(key: string, uri: string, type: AssetType): void;
    getAssets(): Asset[];
    getAssetByKey(key: string): Asset | null;
    load(): Promise<Asset[]>;
}
