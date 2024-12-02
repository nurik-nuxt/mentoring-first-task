import { User } from "../../types/user.types";
import { createReducer, on } from "@ngrx/store";
import * as UserActions from "./users.actions";

export const initialState: { users: User[] } = {
  users: [],
}

export const usersReducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, payload) => ({
    ...state,
    users: payload.users
  }))
)
