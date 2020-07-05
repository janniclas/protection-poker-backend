import { Controller, Body, Post, Param, Patch, Logger } from '@nestjs/common';
import { Asset, ProposeRating, CreateAsset } from './model/Asset';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { AssetService } from './asset.service';

@Controller('asset')
export class AssetController {
  constructor(private assetService: AssetService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Asset,
  })
  createAsset(@Body() newAsset: CreateAsset): Promise<Asset> {
    //TODO: make sure name param is set !
    Logger.log('Received create asset request ' + JSON.stringify(newAsset));
    const asset = this.assetService.createAsset(newAsset);
    return this.assetService.saveAndPublishAsset(asset);
  }

  @Patch(':id')
  async proposeRating(@Param('id') id: string, @Body() proposal: ProposeRating): Promise<Asset> {
    Logger.log('Received patch asset request for asset id ' + id + ' ' + JSON.stringify(proposal));
    const updatedAsset = await this.assetService.updateAsset(proposal.gameId, id, proposal.playerId, proposal.rating);
    // check if all player proposed a rating for the current asset
    return this.assetService.saveAndPublishAsset(updatedAsset);
  }
}
