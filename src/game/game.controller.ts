import { Controller, Get, Post, Body, Param, Logger } from '@nestjs/common';
import { Game, GameOverview, CreateGame } from './model/Game';
import { GameService } from './game.service';
import { DbConnectorService } from '../db-connector/db-connector.service';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('game')
export class GameController {

  constructor(private gameService: GameService, private dbConnectorService: DbConnectorService) { }

  @Get()
  getGameIds(): GameOverview[] {

    return this.dbConnectorService.allGames();
  }

  @Get(':id')
  getGame(@Param('id') id: string): any {
    return this.dbConnectorService.getGame(id);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Game,
  })
  createGame(@Body() createGame: CreateGame): Promise<Game> {

    //TODO: make sure name param is set !
    return new Promise<Game>((resolve, reject) => {
      Logger.log('received create game ' + createGame);
      const game = this.gameService.createGame(createGame);
      const gameSaved = this.dbConnectorService.saveGame(game);
      
      if (gameSaved) {
        resolve(game);
      } else {
        reject('Game was not saved successfully');
      }

    });
  }

}
