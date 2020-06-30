import { Injectable, Logger } from '@nestjs/common';
import { Asset, CreateAsset } from './model/Asset';
import { v4 as uuidv4 } from 'uuid';
import { DbConnectorService } from '../db-connector/db-connector.service';
import { GameGateway } from '../socket/GameGateway';

@Injectable()
export class AssetService {

    constructor(private dbConnectorService: DbConnectorService,
        private gameGateway: GameGateway) { }

    async updateAsset(gameId: string, assetId: string, playerId: string, rating: number) {

        Logger.debug('Trying to update asset with id ' + assetId);

        const game = await this.dbConnectorService.getGame(gameId);
        Logger.debug('Corresponding game ' + JSON.stringify(game));
        const asset = game.assets[assetId];
        if (!asset.proposedRatings[playerId]) {
            asset.proposedRatings[playerId] = [];
        }
        asset.proposedRatings[playerId].push(rating);
        return asset;
    }

    createAsset(newAsset: CreateAsset) {
        const asset = new Asset();
        asset.id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
        asset.name = newAsset.name;
        asset.gameId = newAsset.gameId;
        asset.proposedRatings = {};
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
