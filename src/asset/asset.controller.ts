import { Controller, Body, Post } from '@nestjs/common';
import { Asset, AddAsset } from './model/Asset';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AssetService } from './asset.service';
import { DbConnectorService } from 'src/db-connector/db-connector.service';
import { GameGateway } from 'src/GameGateway';

@Controller('asset')
export class AssetController {

    constructor(private assetService: AssetService, private dbConnectorService: DbConnectorService,
        private gameGateway: GameGateway) { }

    @Post('/create')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: Asset,
    })
    createGame(@Body() addAsset: AddAsset): Promise<Asset> {

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


    @Post('/proposeRating')
    proposeRating(@Body() proposedAssetRating: Asset) {
        
    }

}
