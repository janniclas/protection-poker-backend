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
        return new Asset(uuidv4(), newAsset.gameId, newAsset.name, {});
    }

    async saveAndPublishAsset(asset: Asset) {

        const savedAsset = await this.dbConnectorService.saveAsset(asset);
        this.gameGateway.publishAsset(savedAsset);
        return savedAsset;

    }
}
