import { Injectable } from '@nestjs/common';
import { AddAsset, Asset } from './model/Asset';
import { v4 as uuidv4 } from 'uuid';
import { Game } from 'src/game/model/Game';
import { DbConnectorService } from 'src/db-connector/db-connector.service';
import { GameGateway } from 'src/socket/GameGateway';

@Injectable()
export class AssetService {

    constructor(private dbConnectorService: DbConnectorService,
        private gameGateway: GameGateway) { }

    updateAsset(game: Game, id: string, rating: number) {
        const asset = game.assets[id];
        asset.proposedRatings[id].push(rating);
        return asset;
    }
    createAsset(addAsset: AddAsset) {
        const asset = new Asset();
        asset.id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
        asset.name = addAsset.asset.name;
        asset.gameId = addAsset.gameId;
        return asset;
    }

    saveAndPublishAsset(asset: Asset) {
        return new Promise<Asset>((resolve, reject) => {
            const assetSaved = this.dbConnectorService.saveAsset(asset);
            if (assetSaved) {
                this.gameGateway.publishAsset(asset);
                resolve(asset);
            } else {
                reject('Asset was not updated successfully');
            }
        });
    }
}
