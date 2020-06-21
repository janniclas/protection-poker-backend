import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AssetModule } from '../../src/asset/asset.module';
import { AssetService } from '../../src/asset/asset.service';
import { INestApplication } from '@nestjs/common';
import { Game } from 'src/game/model/Game';
import { DbConnectorService } from 'src/db-connector/db-connector.service';
import { DbConnectorModule } from 'src/db-connector/db-connector.module';

describe('asset', () => {
    let app: INestApplication;
    let assetService = { findAll: () => ['test'] };
    let dbConnector = { getGame: (id: string) => new Game() };
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AssetModule, DbConnectorModule],
        })
            .overrideProvider(AssetService)
            .useValue(assetService)
            .overrideProvider(DbConnectorService)
            .useValue(dbConnector)
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    it(`/GET Asset`, () => {
        return request(app.getHttpServer())
            .get('/asset')
            .expect(200)
            .expect({
                data: assetService.findAll(),
            });
    });

    afterAll(async () => {
        await app.close();
    });
});