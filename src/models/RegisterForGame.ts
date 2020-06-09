import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Game {
    @ApiProperty()
    id: string;

    @ApiPropertyOptional()
    player: Player[];
}

export class Player {}