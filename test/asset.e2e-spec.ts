import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AssetModule } from '../src/asset/asset.module';
import { AssetService } from '../src/asset/asset.service';
import { INestApplication } from '@nestjs/common';
import { DbConnectorService } from '../src/db-connector/db-connector.service';
import { DbConnectorModule } from '../src/db-connector/db-connector.module';
import { SocketModule } from '../src/socket/socket.module';
import { GameGateway } from '../src/socket/GameGateway';
import { getDummyNewAsset, getDummyProposal } from './testUtils';

describe('asset', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SocketModule, DbConnectorModule, AssetModule],
      providers: [DbConnectorService, AssetService, GameGateway],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  const newAsset = getDummyNewAsset();
  it(`/POST`, () => {
    return request(app.getHttpServer())
      .post('/asset')
      .send(newAsset)
      .expect(function(res) {
        if (res.body.id) {
          res.body.id = '123';
        }
      })
      .expect(201, { id: '123', name: newAsset.name, gameId: newAsset.gameId, proposedRatings: {} });
  });

  it(`/POST and /PATCH Asset`, async () => {
    let assetId = 'There was no asset id provided by the server!'; // will be set on server response if response was correct;

    await request(app.getHttpServer())
      .post('/asset')
      .send(newAsset)
      .expect(function(res) {
        if (res.body.id) {
          assetId = res.body.id;
          res.body.id = '123';
        }
      })
      .expect(201, { id: '123', name: newAsset.name, gameId: newAsset.gameId, proposedRatings: {} });

    const rating = getDummyProposal();
    await request(app.getHttpServer())
      .patch('/asset/' + assetId)
      .send(rating)
      .expect(200, { id: assetId, name: newAsset.name, gameId: newAsset.gameId, proposedRatings: { '42': [5] } });
  });

  afterAll(async () => {
    await app.close();
  });
});
