import { Controller, Get, Post, Body, Param, Logger } from '@nestjs/common';
import { Game, GameOverview, CreateGame } from './model/Game';
import { GameService } from './game.service';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('game')
export class GameController {

  constructor(private gameService: GameService) { }

  @Get()
  getGameIds(): GameOverview[] {
    return this.gameService.allGamesOverview();
  }

  @Get(':id')
  getGame(@Param('id') id: string): Game {
    return this.gameService.getGame(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Game,
  })
  createGame(@Body() createGame: CreateGame): Promise<Game> {

    //TODO: make sure name param is set !

    Logger.log('received create game ' + createGame);
    const game = this.gameService.createGame(createGame);
    return this.gameService.saveGame(game);
  }

}
