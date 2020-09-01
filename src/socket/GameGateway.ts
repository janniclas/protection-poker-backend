import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Asset } from '../asset/model/Asset';

@WebSocketGateway()
export class GameGateway implements OnGatewayInit, OnGatewayConnection {
  handleConnection(client: Socket, ...args: any[]): void {
    Logger.log('connection received from ' + client + ' with args ' + args);
  }
  afterInit(server: Server): void {
    Logger.log('gateway initialized with server ' + server);
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

  public publishAsset(asset: Asset): void {
    this.getClientsForGame(asset.gameId).forEach((socket) => {
      socket.emit('addAsset', asset);
    });
  }

  private getClientsForGame(gameId: string): Socket[] {
    const clients = this.gameClient[gameId];
    return clients ? clients : [];
  }
}
