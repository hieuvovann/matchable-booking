import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBookingDTO {
  @IsNumber()
  @IsNotEmpty()
  trainerId: number;

  @IsNumber()
  @IsNotEmpty()
  sessionId: number;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsNumber()
  @IsNotEmpty()
  duration: number;
}
