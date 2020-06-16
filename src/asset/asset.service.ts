import { Injectable } from '@nestjs/common';
import { AddAsset, Asset } from './model/Asset';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AssetService {
    createAsset(addAsset: AddAsset) {
        const asset = new Asset();
        asset.id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
        asset.name = addAsset.asset.name;
        asset.gameId = addAsset.gameId;
        return asset;
    }
}
