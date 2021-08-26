import { AssetType } from "../assets/AssetsManager";

export const HEROE_KEY:string   = "heroe";
export const CHEST_KEY:string   = "chest";
export const FLOOR_KEY:string   = "floor";
export const WALL_KEY:string    = "wall";

export const ASSETS_LISTS:{key:string, uri:string, type:AssetType}[] = [
    {key: HEROE_KEY, uri:"assets/heroe.png", type:AssetType.IMAGE},
    {key: CHEST_KEY, uri:"assets/chest.png", type:AssetType.IMAGE},
    {key: FLOOR_KEY, uri:"assets/floor2.jpg", type:AssetType.IMAGE},
    {key: WALL_KEY,  uri:"assets/wall3.jpg", type:AssetType.IMAGE}
];
export const CELL_SIZE:number = 84;