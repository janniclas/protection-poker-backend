import { Injectable } from '@nestjs/common';
import { Game, GameOverview } from 'src/game/model/Game';


@Injectable()
export class DbConnectorService {

    allGames(): GameOverview[] {
        return Object.values(State.games).map(game => {
            const overview = new GameOverview();
            overview.name = game.name; overview.id = game.id;
            return overview;
        });
    }

    saveGame(game: Game): boolean {
        State.games[game.id] = game;
        return true;
    }

    getGame(gameId: string): Game {
        return State.games[gameId];
    }
}


const State: { games: { [id: string]: Game } } = { games: {} };
