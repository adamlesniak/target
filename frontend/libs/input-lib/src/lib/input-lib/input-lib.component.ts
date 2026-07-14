import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { form, FormField, validateStandardSchema } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { NxErrorModule } from '@aposin/ng-aquila/base';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxDropdownComponent, NxDropdownItemComponent } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldComponent } from '@aposin/ng-aquila/formfield';
import { NxColComponent, NxLayoutComponent, NxRowComponent } from '@aposin/ng-aquila/grid';
import { NxInputModule } from '@aposin/ng-aquila/input';
import { NxSpinnerModule } from '@aposin/ng-aquila/spinner';
import { Beitragszahlungsweise, BerechnungDerLaufzeit, InputDtoSchema, Leistungsvorgabe, Rentenzahlungsweise } from '@target/validations';

import { InputStore } from './store/input.store';

interface InputLibForm {
  leistungsVorgabe: Leistungsvorgabe | null;
  beitrag: number;
  berechnungDerLaufzeit: BerechnungDerLaufzeit | null;
  laufzeit: number;
  beitragszahlungsweise: Beitragszahlungsweise | null;
  geburtsdatum: string;
  rentenzahlungsweise: Rentenzahlungsweise | null;
}

@Component({
  selector: 'lib-input-lib',
  standalone: true,
  imports: [
    CommonModule,
    NxLayoutComponent,
    NxRowComponent,
    NxColComponent,
    NxFormfieldComponent,
    NxDropdownComponent,
    NxDropdownItemComponent,
    NxInputModule,
    NxErrorModule,
    NxButtonModule,
    NxSpinnerModule,
    FormField,
  ],
  templateUrl: './input-lib.component.html',
})
export class InputLibComponent {
  private readonly router = inject(Router);
  protected readonly inputStore = inject(InputStore);

  libFormModel = signal<InputLibForm>({
    leistungsVorgabe: this.inputStore.uiState().leistungsVorgabe.value,
    beitrag: this.inputStore.uiState().beitrag.value,
    berechnungDerLaufzeit: this.inputStore.uiState().berechnungDerLaufzeit.value,
    laufzeit: this.inputStore.uiState().laufzeit.value,
    beitragszahlungsweise: this.inputStore.uiState().beitragszahlungsweise.value,
    geburtsdatum: this.inputStore.uiState().geburtsdatum.value,
    rentenzahlungsweise: this.inputStore.uiState().rentenzahlungsweise.value,
  });

  inputLibForm = form(this.libFormModel, schemaPath => {
    validateStandardSchema(schemaPath.leistungsVorgabe, InputDtoSchema.shape.leistungsVorgabe);
    validateStandardSchema(schemaPath.beitrag, InputDtoSchema.shape.beitrag);
    validateStandardSchema(schemaPath.berechnungDerLaufzeit, InputDtoSchema.shape.berechnungDerLaufzeit);
    validateStandardSchema(schemaPath.laufzeit, InputDtoSchema.shape.laufzeit);
    validateStandardSchema(schemaPath.beitragszahlungsweise, InputDtoSchema.shape.beitragszahlungsweise);
    validateStandardSchema(schemaPath.geburtsdatum, InputDtoSchema.shape.geburtsdatum);
    validateStandardSchema(schemaPath.rentenzahlungsweise, InputDtoSchema.shape.rentenzahlungsweise);
  });

  isLoading = signal<boolean>(false);
  isError = signal<Error | null>(null);

  async calculate(): Promise<void> {
    this.isLoading.set(true);

    const values = this.libFormModel();

    try {
      await this.inputStore.calculate({
        leistungsVorgabe: values.leistungsVorgabe,
        beitrag: values.beitrag,
        berechnungDerLaufzeit: values.berechnungDerLaufzeit,
        laufzeit: values.laufzeit,
        beitragszahlungsweise: values.beitragszahlungsweise,
        geburtsdatum: new Date(values.geburtsdatum).toISOString(),
      });
      this.router.navigate(['summary']);
      this.isLoading.set(false);
    } catch (err: unknown) {
      this.isLoading.set(false);
      console.error(err);
      if (err instanceof HttpErrorResponse) {
        this.isError.set((err as HttpErrorResponse).error);
      } else {
        this.isError.set(err as Error);
      }
    }
  }
}
