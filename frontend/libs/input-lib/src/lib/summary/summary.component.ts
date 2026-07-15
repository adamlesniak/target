import { Component, inject } from '@angular/core';
import { NxColComponent, NxLayoutComponent, NxRowComponent } from '@aposin/ng-aquila/grid';

import { InputStore } from '../input-lib/store/input.store';

@Component({
  selector: 'lib-summary',
  imports: [NxLayoutComponent, NxRowComponent, NxColComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
})
export class SummaryComponent {
  protected readonly inputStore = inject(InputStore);
}
