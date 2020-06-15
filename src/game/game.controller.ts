import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Game, GameOverview, CreateGame } from './model/Game';
import { GameService } from './game.service';
import { DbConnectorService } from 'src/db-connector/db-connector.service';
import { ApiCreatedResponse } from '@nestjs/swagger';

@Controller('game')
export class GameController {

  constructor(private gameService: GameService, private dbConnectorService: DbConnectorService) { }

  @Get('/all')
  getGameIds(): GameOverview[] {

    return this.dbConnectorService.allGames();
  }

  @Get(':id')
  getGame(@Param('id') id: string): Game {
    return this.dbConnectorService.getGame(id);
  }

  @Post('/create')
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: Game,
  })
  createGame(@Body() createGame: CreateGame): Promise<Game> {

    return new Promise<Game>((resolve, reject) => {

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
