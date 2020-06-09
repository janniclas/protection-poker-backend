import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RatingElementDto {

    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiPropertyOptional()
    rating: number;
}