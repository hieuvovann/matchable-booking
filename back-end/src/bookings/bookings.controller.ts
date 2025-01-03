import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { AccountVerified } from '@/auth/decorators/account-verified';
import { Request } from 'express';
import { BookingEntity } from './entites/booking.entity';
import { CreateBookingDTO } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @AccountVerified('jwt')
  @Get()
  getBookings(@Req() req: Request): Promise<BookingEntity[]> {
    return this.bookingsService.findBookings((req.user as any).id);
  }

  @AccountVerified('jwt')
  @Post()
  createBookings(
    @Req() req: Request,
    @Body() body: CreateBookingDTO[],
  ): Promise<BookingEntity[]> {
    return this.bookingsService.createBookings((req.user as any).id, body);
  }
}
