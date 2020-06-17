import { ApiProperty, PickType } from '@nestjs/swagger';
import { Asset } from 'src/asset/model/Asset';
import { MyMap } from 'src/models/RatingElement';



export class Game {
    
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    player: Player[];

    @ApiProperty()
    assets: MyMap<Asset>;

}

export class GameOverview extends PickType(Game, ['id', 'name'] as const) {}

export class CreateGame extends PickType(Game, [ 'name'] as const) {}


export class Player {}