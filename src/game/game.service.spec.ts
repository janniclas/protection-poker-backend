import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service';
import { DbConnectorModule } from '../db-connector/db-connector.module';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService],
      imports: [DbConnectorModule],
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
