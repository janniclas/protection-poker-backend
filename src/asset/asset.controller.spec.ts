import { Test, TestingModule } from '@nestjs/testing';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';

describe('Asset Controller', () => {
  let controller: AssetController;
  let assetService = { createAsset: () => {}, updateAsset: () => {}};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetController],
      providers: [AssetService]
    }).overrideProvider(AssetService).useValue(assetService).compile();

    controller = module.get<AssetController>(AssetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
