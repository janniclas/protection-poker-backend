import { Test, TestingModule } from '@nestjs/testing';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';

describe('Asset Controller', () => {
  let controller: AssetController;
  const assetService = {
    createAsset: () => {
      console.log('this is a stub method');
    },
    updateAsset: () => {
      console.log('this is a stub method');
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetController],
      providers: [AssetService],
    })
      .overrideProvider(AssetService)
      .useValue(assetService)
      .compile();

    controller = module.get<AssetController>(AssetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
