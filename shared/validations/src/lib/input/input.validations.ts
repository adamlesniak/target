import { z } from 'zod';

import { BeitragszahlungsweiseSchema } from './beitragszahlungsweise';
import { BerechnungDerLaufzeitSchema } from './berechnung-der-laufzeit';
import { LeistungsvorgabeSchema } from './leistungsvorgabe';
import { RentenzahlungsweiseSchema } from './rentenzahlungsweise';

function isoMax(maxDate: string) {
  return (value: string) => !!(new Date(value).getTime() <= new Date(maxDate).getTime());
}

export const InputDtoSchema = z.object({
  leistungsVorgabe: LeistungsvorgabeSchema.nullish(),
  beitrag: z.number().min(500, 'Der Beitrag muss mindestens 500€ betragen').max(100000, 'Der Beitrag darf höchstens 100.000€ betragen'),
  berechnungDerLaufzeit: BerechnungDerLaufzeitSchema.nullish(),
  laufzeit: z.number().min(1, 'Die Laufzeit muss mindestens 1 Jahr betragen').max(100, 'Die Laufzeit darf höchstens 40 Jahre betragen'),
  beitragszahlungsweise: BeitragszahlungsweiseSchema.nullish(),
  geburtsdatum: z
    .string()
    .refine(
      isoMax(`${new Date(`${new Date().getFullYear() - 18}/${new Date().getMonth()}/${new Date().getDay()}`)}`),
      'Se requiere la fecha de nacimiento, la cual debe ser válida, y la persona debe tener al menos 18 años de edad.',
    ),
  rentenzahlungsweise: RentenzahlungsweiseSchema.nullish(),
});

export type InputDto = z.infer<typeof InputDtoSchema>;
