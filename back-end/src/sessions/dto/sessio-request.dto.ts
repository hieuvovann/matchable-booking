import { IsArray, IsOptional, IsString } from 'class-validator';

export class SessionRequestQuery {
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ids?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  trainerIds?: string[];
}
