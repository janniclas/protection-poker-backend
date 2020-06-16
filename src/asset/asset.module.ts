import { Module } from '@nestjs/common';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { DbConnectorModule } from 'src/db-connector/db-connector.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  controllers: [AssetController],
  providers: [AssetService],
  imports: [DbConnectorModule, SocketModule]
})
export class AssetModule {}
