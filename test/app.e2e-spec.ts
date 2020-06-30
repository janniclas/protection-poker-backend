import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AssetModule } from '../src/asset/asset.module';
import { AssetService } from '../src/asset/asset.service';
import { INestApplication } from '@nestjs/common';
import { DbConnectorService } from '../src/db-connector/db-connector.service';
import { DbConnectorModule } from '../src/db-connector/db-connector.module';
import { SocketModule } from '../src/socket/socket.module';
import { GameGateway } from '../src/socket/GameGateway';
import { GameModule } from '../src/game/game.module';
import { GameService } from '../src/game/game.service';
import { getDummyNewAsset, getDummyNewGame } from './testUtils';
import { Game } from '../src/game/model/Game';
import { Asset } from 'src/asset/model/Asset';


describe('app', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [SocketModule, DbConnectorModule, AssetModule, GameModule],
            providers: [DbConnectorService, AssetService, GameGateway, GameService]
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`create game, add asset, modify asset`, async () => {

        const gameRequest = (id: string, expected: Game) => {
            expected.id = id; // stupid behavior of expected method...
            return request(app.getHttpServer())
                .get('/game/' + id).expect(200, expected)
        };

        const newGame = getDummyNewGame();
        let gameId = 'There was no asset id provided by the server!'; // will be set on server response if response was correct
        let assetId = 'There was no asset id provided by the server!'; // will be set on server response if response was correct
        let createdGame: Game;
        let createdAssset: Asset;

        await request(app.getHttpServer())
            .post('/game').send(newGame).expect(function (res) {
                if (res.body.id) {
                    createdGame = res.body;
                    gameId = res.body.id;
                    res.body.id = '123';
                }
            }).expect(201, { id: '123', name: newGame.name, assets: {} });
        await gameRequest(gameId, createdGame);

        const newAsset = getDummyNewAsset(gameId);

        await request(app.getHttpServer())
            .post('/asset').send(newAsset).expect(function (res) {
                if (res.body.id) {
                    createdAssset = res.body;
                    assetId = res.body.id;
                    res.body.id = '123';
                }
            }).expect(201, { id: '123', name: newAsset.name, gameId: newAsset.gameId, proposedRatings: {} })

        createdAssset.id = assetId;
        createdGame.assets[createdAssset.id] = createdAssset;
        await gameRequest(createdGame.id, createdGame);
    })


    afterAll(async () => {
        await app.close();
    });
});

