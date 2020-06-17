import { Controller, Body, Post } from '@nestjs/common';
import { Asset, AddAsset, ProposeRating } from './model/Asset';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AssetService } from './asset.service';
import { DbConnectorService } from 'src/db-connector/db-connector.service';
import { GameGateway } from 'src/socket/GameGateway';

@Controller('asset')
export class AssetController {

    constructor(private assetService: AssetService, private dbConnectorService: DbConnectorService,
        private gameGateway: GameGateway) { }

    @Post('/create')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: Asset,
    })
    createAsset(@Body() addAsset: AddAsset): Promise<Asset> {
        //TODO: make sure name param is set !
        return new Promise<Asset>((resolve, reject) => {
            const asset = this.assetService.createAsset(addAsset);
            const assetSaved = this.dbConnectorService.saveAsset(asset);

            if (assetSaved) {
                this.gameGateway.publishAsset(asset);
                resolve(asset);
            } else {
                reject('Asset was not saved successfully');
            }

        });
    }


    @Post('/proposal')
    proposeRating(@Body() proposal: ProposeRating): Asset {
        const game = this.dbConnectorService.getGame(proposal.gameId);
        const assetToUpdate = game.assets[proposal.id];
        assetToUpdate.proposedRatings[proposal.id].push(proposal.rating);

        return assetToUpdate;
    }

}
