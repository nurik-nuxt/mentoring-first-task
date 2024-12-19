import { Actions, createEffect } from "@ngrx/effects";
import { inject } from "@angular/core";
import { UsersApiService } from "../../services/users-api.service";
import { UsersService } from "../../services/users.service";

export const usersEffects = createEffect(
  () => {
    const actions = inject(Actions);
    const usersApiServices = inject(UsersApiService);
    const usersService = inject(UsersService);
    return actions.pipe
  },
  { functional: true }
)
