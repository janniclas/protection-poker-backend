import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { DbConnectorModule } from '../db-connector/db-connector.module';

@Module({
  controllers: [GameController],
  providers: [GameService],
  imports: [DbConnectorModule],
})
export class GameModule {}
