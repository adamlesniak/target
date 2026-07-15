import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { InputStore } from '../input-lib/store/input.store';

export const summaryGuard: CanActivateFn = () => {
  const [router, inputStore] = [inject(Router), inject(InputStore)];

  if (inputStore.uiState().quote.basisdaten.alterBeiRentenbeginn === 0) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
