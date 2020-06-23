import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { MyMap } from 'src/models/RatingElement';


export class Asset {

    @ApiProperty()
    id: string;

    @ApiProperty()
    gameId: string;

    @ApiProperty()
    name: string;

    @ApiPropertyOptional()
    rating: number;

    @ApiPropertyOptional()
    proposedRatings: MyMap<Array<number>>
}

export class NewAsset extends PickType(Asset, ['name', 'gameId'] as const) {}

export class ProposeRating {
    @ApiProperty()
    gameId: string;

    @ApiProperty()
    playerId: string;
    
    @ApiProperty()
    rating: number;
}
