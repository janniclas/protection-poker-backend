import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { DbConnectorModule } from './db-connector/db-connector.module';
import { AssetModule } from './asset/asset.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [GameModule, DbConnectorModule, AssetModule, SocketModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
