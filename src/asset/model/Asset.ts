import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';


export class Asset {

    @ApiProperty()
    id: string;

    @ApiProperty()
    gameId: string;

    @ApiProperty()
    name: string;

    @ApiPropertyOptional()
    rating: number;
}

export class NewAsset extends PickType(Asset, ['name'] as const) {}

export class AddAsset {
    @ApiProperty()
    gameId: string;

    @ApiProperty()
    asset: NewAsset;
}