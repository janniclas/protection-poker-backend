import { Injectable } from '@nestjs/common';
import { Game, GameOverview } from 'src/game/model/Game';
import { Asset } from 'src/asset/model/Asset';


@Injectable()
export class DbConnectorService {
    saveAsset(asset: Asset) {
        const game = State.games.get(asset.gameId);
        if (game) {
            game.assets.set(asset.id, asset);
            return true;
        }
        return false;
    }

    allGames(): GameOverview[] {
        return Array.from(State.games.values()).map(game => {
            const overview = new GameOverview();
            overview.name = game.name; overview.id = game.id;
            return overview;
        });
    }

    saveGame(game: Game): boolean {
        State.games.set(game.id, game);
        return true;
    }

    getGame(gameId: string): Game {
        return State.games.get(gameId);
    }
}


const State: { games: Map<string, Game> } = { games: new Map<string, Game>() };
