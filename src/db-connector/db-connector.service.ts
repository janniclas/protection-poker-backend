import { Injectable } from '@nestjs/common';
import { Game, GameOverview } from 'src/game/model/Game';
import { Asset } from 'src/asset/model/Asset';
import { MyMap } from 'src/models/RatingElement';


@Injectable()
export class DbConnectorService {
    saveAsset(asset: Asset) {
        const game = State.games[asset.gameId];
        if (game) {
            game.assets[asset.id] = asset;
            return true;
        }
        return false;
    }

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


const State: { games: MyMap<Game> } = { games: {}};
const emptyGame = new Game();
emptyGame.assets = {};
emptyGame.id = '-1';
emptyGame.name = 'Empty Game for test Purposes';
emptyGame.player = [];
State.games['-1'] = emptyGame;
