import { Controller, Get, Post, Body, Param, Logger } from '@nestjs/common';
import { Game, GameOverview, CreateGame } from './model/Game';
import { GameService } from './game.service';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}

  @Get()
  getGameIds(): Promise<GameOverview[]> {
    return this.gameService.allGamesOverview();
  }

  @Get(':id')
  getGame(@Param('id') id: string): Promise<Game> {
    Logger.log('received get game with id ' + id);
    return this.gameService.getGame(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Game,
  })
  createGame(@Body() createGame: CreateGame): Promise<Game> {
    //TODO: make sure name param is set !
    // therefore, figure out how to combine
    // validator pipes with swagger

    Logger.log('received create game ' + JSON.stringify(createGame));
    const game = this.gameService.createGame(createGame);
    return this.gameService.saveGame(game);
  }
}
