import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { MyMap } from 'src/models/RatingElement';


export class Asset {

    constructor(id: string, gameId: string, name: string, proposedRatings?: MyMap<Array<number>>, rating?: number) {
        this.id = id;
        this.gameId = gameId;
        this.name = name;
        if (rating) {
            this.rating = rating
        }
        if (proposedRatings) {
            this.proposedRatings = proposedRatings;
        }
    }

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

export class CreateAsset extends PickType(Asset, ['name', 'gameId'] as const) { }

export class ProposeRating {
    @ApiProperty()
    gameId: string;

    @ApiProperty()
    playerId: string;

    @ApiProperty()
    rating: number;
}
