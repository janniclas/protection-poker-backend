
import { ApiProperty, PickType, ApiPropertyOptional } from '@nestjs/swagger';
import { Asset } from 'src/asset/model/Asset';
import { MyMap } from 'src/models/RatingElement';


export class GameManager {
    game: Game;
    gameState: GameState;
}

export class Game {

    constructor(id: string, name: string, assets: MyMap<Asset>) {
        this.id = id;
        this.name = name;
        this.assets = assets;
    }

    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    assets: MyMap<Asset>;
}

export class GameState {

    @ApiProperty()
    type: GameType

    @ApiProperty()
    player: Player[];

    @ApiPropertyOptional()
    currentElementId: string
}

enum GameType {
    ADD_ASSET,
    RATE_ASSET,
    OVERVIEW_ASSET,
    ADD_FEATURES
}

export class GameOverview extends PickType(Game, ['id', 'name'] as const) { }

export class CreateGame extends PickType(Game, ['name'] as const) { }


export class Player { }