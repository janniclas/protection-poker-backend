import { Controller, Body, Post, Param, Patch } from '@nestjs/common';
import { Asset, AddAsset, ProposeRating } from './model/Asset';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AssetService } from './asset.service';
import { DbConnectorService } from 'src/db-connector/db-connector.service';

@Controller('asset')
export class AssetController {

    constructor(private assetService: AssetService, private dbConnectorService: DbConnectorService) { }

    @Post()
    @ApiCreatedResponse({
        description: 'The record has been successfully created.',
        type: Asset,
    })
    createAsset(@Body() addAsset: AddAsset): Promise<Asset> {
        //TODO: make sure name param is set !
        const asset = this.assetService.createAsset(addAsset);
        return this.assetService.saveAndPublishAsset(asset);

    }


    @Patch(':id')
    proposeRating(@Param('id') id: string, @Body() proposal: ProposeRating): Promise<Asset> {

        const game = this.dbConnectorService.getGame(proposal.gameId);
        const updatedAsset = this.assetService.updateAsset(game, id, proposal.rating);
        // check if all player proposed a rating for the current asset
        return this.assetService.saveAndPublishAsset(updatedAsset);

    }


}
