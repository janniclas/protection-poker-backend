import { Test, TestingModule } from '@nestjs/testing';
import { AssetService } from './asset.service';
import { SocketModule } from '../socket/socket.module';
import { DbConnectorModule } from '../db-connector/db-connector.module';

describe('AssetService', () => {
  let service: AssetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssetService],
      imports: [SocketModule, DbConnectorModule],
    }).compile();

    service = module.get<AssetService>(AssetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
