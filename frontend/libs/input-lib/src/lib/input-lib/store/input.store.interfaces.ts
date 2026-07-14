import { QuoteResponseDto } from '@target/interfaces';
import { Beitragszahlungsweise, BerechnungDerLaufzeit, Leistungsvorgabe, Rentenzahlungsweise } from '@target/validations';

interface InputField<T> {
  value: T;
  valid: boolean;
  error: string | null;
}

export interface InputState {
  leistungsVorgabe: InputField<Leistungsvorgabe>;
  beitrag: InputField<number>;
  geburtsdatum: InputField<string>;
  berechnungDerLaufzeit: InputField<BerechnungDerLaufzeit>;
  laufzeit: InputField<number>;
  beitragszahlungsweise: InputField<Beitragszahlungsweise>;
  rentenzahlungsweise: InputField<Rentenzahlungsweise>;
  quote: QuoteResponseDto;
}

export interface Input {
  key: keyof InputState;
  value: string | number;
}
