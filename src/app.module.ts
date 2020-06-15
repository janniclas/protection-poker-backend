import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameGateway } from './GameGateway';
import { GameModule } from './game/game.module';
import { DbConnectorModule } from './db-connector/db-connector.module';

@Module({
  imports: [GameModule, DbConnectorModule],
  controllers: [AppController],
  providers: [GameGateway, AppService],
})
export class AppModule {}
