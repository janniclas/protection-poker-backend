import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayInit, OnGatewayConnection } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AddAsset, Asset } from './models/RatingElement';
import { Logger } from '@nestjs/common';


@WebSocketGateway()
export class GameGateway implements OnGatewayInit, OnGatewayConnection {

    handleConnection(client: Socket, ...args: any[]) {
        console.log("connection received");
    }
    afterInit(server: Server) {
        console.log("gateway initialized");
    }

    private gameClient: { [id: string]: Socket[] } = {};

    @SubscribeMessage('register')
    handleRegister(@MessageBody() gameId: string, @ConnectedSocket() client: Socket): void {
        Logger.log('Received register event for game: ' + gameId);
        this.addClientToGame(client, gameId);
    }

    private addClientToGame(client: Socket, gameId: string): void {
        if (!this.gameClient[gameId]) {
            this.gameClient[gameId] = [];
        }
        this.gameClient[gameId].push(client);
    }

    public handleaddAsset(addAsset: AddAsset) {
        
        this.getClientsForGame(addAsset.gameId).forEach((socket) => {
            socket.emit('addAsset', Asset);
        });
        return addAsset.asset;
    }

    private getClientsForGame(gameId: string): Socket[] {
        return this.gameClient[gameId];
    }

}