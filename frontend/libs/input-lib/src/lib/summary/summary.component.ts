import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NxColComponent, NxLayoutComponent, NxRowComponent } from '@aposin/ng-aquila/grid';

import { InputStore } from '../input-lib/store/input.store';

@Component({
  selector: 'lib-summary',
  imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent implements OnInit {
  protected readonly inputStore = inject(InputStore);
  private readonly router = inject(Router);

  ngOnInit(): void {
    if (this.inputStore.uiState().quote.basisdaten.alterBeiRentenbeginn === 0) {
      this.router.navigate(['/']);
    }
  }
}
