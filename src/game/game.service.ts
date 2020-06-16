import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateGame, Game } from './model/Game';
import { Asset } from 'src/asset/model/Asset';

@Injectable()
export class GameService {

     createGame(createGame: CreateGame) {
        const game = new Game();
        game.id = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d';
        game.assets = new Map<string, Asset>();
        game.player = [];
        game.name = createGame.name;
        return game;
    }
}
