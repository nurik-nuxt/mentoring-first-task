import { createSelector } from '@ngrx/store';
import { User } from "../../types/user.types";

interface UserState {
  users: User[];
}

interface AppState {
  users: UserState;
}

export const selectUsersFeature = (state: AppState) => state.users;

export const selectedUsers = createSelector(
  selectUsersFeature,
  (state) => state.users
)
