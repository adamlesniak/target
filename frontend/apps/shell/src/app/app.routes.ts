import { Route } from '@angular/router';
import { InputLibComponent, SummaryComponent } from '@target/input-lib';

const ROUTES = {
  INPUTS: 'inputs',
  DOB: 'dob',
  SUMMARY: 'summary',
};

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ROUTES.INPUTS,
  },
  {
    path: ROUTES.SUMMARY,
    component: SummaryComponent,
  },
  {
    path: ROUTES.INPUTS,
    component: InputLibComponent,
  },
  {
    path: '**',
    redirectTo: ROUTES.INPUTS,
  },
];
