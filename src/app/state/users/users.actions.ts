// import { createActionGroup, emptyProps, props } from "@ngrx/store";
// import {User} from "../../types/user.types";
//
// export const usersActions = createActionGroup({
//   source: 'users',
//   events: {
//     loadUsers: emptyProps(),
//
//     loadUsersSuccess: props<{ users: User[] }>(),
//
//     loadUsersFailure: props<{ error: string }>(),
//
//     addUser: props<{ user: User }>(),
//
//     updateUser: props<{ user: User }>(),
//
//     deleteUser: props<{ id: number }>()
//   }
// })

import {createAction, emptyProps, props} from "@ngrx/store";
import {User} from "../../types/user.types";

export const loadUsers = createAction(
  '[User] Load users]',
  emptyProps
)

export const loadUsersSuccess = createAction(
  '[User] Load users success',
  props<{ users: User[] }>()
)

export const loadUsersFailed = createAction(
  '[User] Load users failed',
  props<{ error: string }>()
)

export const addUser = createAction(
  '[User] Add user',
  props<{ user: User }>()
)

export const updateUser = createAction(
  '[User] Update user',
  props<{ user: User }>()
)

export const deleteUser = createAction(
  '[User] Delete user',
  props<{ id: number }>()
)
