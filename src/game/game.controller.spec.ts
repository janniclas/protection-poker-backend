import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';

describe('Game Controller', () => {
  let controller: GameController;
  const gameService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService],
    })
      .overrideProvider(GameService)
      .useValue(gameService)
      .compile();

    controller = module.get<GameController>(GameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
