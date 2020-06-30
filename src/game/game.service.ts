import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateGame, Game, GameOverview } from './model/Game';
import { DbConnectorService } from '../db-connector/db-connector.service';

@Injectable()
export class GameService {

    constructor(private dbService: DbConnectorService) { }

    allGamesOverview(): Promise<GameOverview[]> {
        return this.dbService.allGames();
    }

    createGame(createGame: CreateGame) {
        const game = new Game();
        game.id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
        game.assets = {};
        game.name = createGame.name;
        return game;
    }

    saveGame(game: Game): Promise<Game> {
        return this.dbService.saveGame(game);
    }

    getGame(id: string): Promise<Game> {
        return this.dbService.getGame(id);
    }
}
