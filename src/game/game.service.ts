import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateGame, Game, GameOverview } from './model/Game';
import { DbConnectorService } from '../db-connector/db-connector.service';

@Injectable()
export class GameService {
  constructor(private dbService: DbConnectorService) {}

  allGamesOverview(): Promise<GameOverview[]> {
    return this.dbService.allGames();
  }

  createGame(createGame: CreateGame): Game {
    return new Game(uuidv4(), createGame.name, {});
  }

  saveGame(game: Game): Promise<Game> {
    return this.dbService.saveGame(game);
  }

  getGame(id: string): Promise<Game> {
    return this.dbService.getGame(id);
  }
}
