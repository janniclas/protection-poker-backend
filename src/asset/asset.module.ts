import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { DbConnectorModule } from '../db-connector/db-connector.module';
import { SocketModule } from '../socket/socket.module';

@Module({
  controllers: [AssetController],
  providers: [AssetService],
  imports: [DbConnectorModule, SocketModule],
})
export class AssetModule {}
