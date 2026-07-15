import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { QuoteRequestDto, QuoteResponseDto } from '@target/interfaces';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuoteService {
  private readonly http = inject(HttpClient);

  calculateQuote(quoteDto: QuoteRequestDto): Observable<QuoteResponseDto> {
    // TODO: To be pulled on build from env or json file.
    return this.http.post<QuoteResponseDto>('http://localhost:3000/api/quote', quoteDto);
  }
}
