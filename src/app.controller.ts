import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Game, Player } from './models/RegisterForGame';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/register')
  register(@Body() registerForGame: Game): string {
    return 'registered';
  }

  @Get()
  getGames(): Game[] {

    return [];
  }

  @Post('/create')
  createGame(@Body() player: Player): Game {
    const game = new Game();
    game.id = '' + Math.random();
    game.player = [player];
    return game;
  }
}
