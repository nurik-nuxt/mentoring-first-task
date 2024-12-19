import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from "@angular/common/http";
import { provideStore } from "@ngrx/store";
import { provideEffects } from '@ngrx/effects';
import { usersReducer } from "./state/users/users.reducer";
import { usersEffects } from "./state/users/users.effects";
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      users: usersReducer,
    }),
    provideEffects({usersEffects}),
  ]
};
