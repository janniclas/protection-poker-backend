import { ApiProperty } from '@nestjs/swagger';

export class RegisterForGameDto {
    @ApiProperty()
    name: string;
}