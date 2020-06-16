import { Module } from '@nestjs/common';
import { GameGateway } from './GameGateway';

@Module({
    providers: [GameGateway],
    exports: [GameGateway]
})
export class SocketModule {}
