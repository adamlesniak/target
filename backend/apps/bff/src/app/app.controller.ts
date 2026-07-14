/* eslint-disable @nx/enforce-module-boundaries */
import { Body, Controller, Post } from '@nestjs/common';

import { QuoteRequestDto, QuoteResponseDto } from '../../../../../shared/interfaces';
import { InputDtoSchema } from '../../../../../shared/validations';
import { ValidationPipe } from './pipes/validation.pipe';
import { QuoteService } from './services/quote/quote.service';

@Controller()
export class AppController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post('/quote')
  getQuote(@Body(new ValidationPipe(InputDtoSchema)) quoteDto: QuoteRequestDto): Promise<QuoteResponseDto> {
    return this.quoteService.getQuote(quoteDto);
  }
}
