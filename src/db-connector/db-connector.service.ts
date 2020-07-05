import { Injectable, Logger } from '@nestjs/common';
import { Game, GameOverview } from '../game/model/Game';
import { Asset } from '../asset/model/Asset';
import { MyMap } from '../models/RatingElement';

@Injectable()
export class DbConnectorService {
  saveAsset(asset: Asset): Promise<Asset> {
    Logger.debug('Trying to save asset ' + JSON.stringify(asset));
    return new Promise((resolve, reject) => {
      const game = State.games[asset.gameId];
      Logger.debug('Corresponding game ' + JSON.stringify(game));
      if (game) {
        game.assets[asset.id] = asset;
        resolve(asset);
      }
      reject('Asset could not be saved successfully');
    });
  }

  allGames(): Promise<GameOverview[]> {
    return new Promise(resolve =>
      resolve(
        Object.values(State.games).map(game => {
          const overview = new GameOverview();
          overview.name = game.name;
          overview.id = game.id;
          return overview;
        }),
      ),
    );
  }

  saveGame(game: Game): Promise<Game> {
    return new Promise((resolve, reject) => {
      if (!State.games[game.id]) {
        State.games[game.id] = game;
        resolve(game);
      } else {
        reject('Game with the given id already exists.');
      }
    });
  }

  getGame(gameId: string): Promise<Game> {
    return new Promise((resolve, reject) => {
      const game = State.games[gameId];
      if (game) {
        Logger.debug('Retrieved game ' + JSON.stringify(game));
        resolve(game);
      } else {
        reject('Game with given id was not found.');
      }
    });
  }
}

const State: { games: MyMap<Game> } = { games: {} };

export const createEmptyGameDummy = (): Game => {
  return new Game('-1', 'Emtpy Game for test purposes', {});
};

State.games['-1'] = createEmptyGameDummy();
