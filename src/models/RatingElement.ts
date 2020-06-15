import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';


export class RatingElementDto {

    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiPropertyOptional()
    rating: number;
}

export class Asset extends PickType(RatingElementDto, ['id', 'name'] as const) {}

export class NewAsset extends PickType(RatingElementDto, ['name'] as const) {}

export class AddAsset {
    @ApiProperty()
    gameId: string;

    @ApiProperty()
    asset: NewAsset;
}