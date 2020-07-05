import { Module } from '@nestjs/common';
import { DbConnectorService } from './db-connector.service';

@Module({
  providers: [DbConnectorService],
  exports: [DbConnectorService],
})
export class DbConnectorModule {}
