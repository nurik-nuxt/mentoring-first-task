import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {AsyncPipe, NgForOf} from "@angular/common";
import {UserCardComponent} from "./user-card/user-card.component";
import {User} from "../types/user.types";
import {MatDialog} from "@angular/material/dialog";
import {CreateUserDialogComponent} from "./create-user-dialog/create-user-dialog.component";
import {Store} from "@ngrx/store";
import { selectedUsers } from "../state/users/users.selectors";
import {addUser, deleteUser, loadUsers, updateUser} from "../state/users/users.actions";

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  imports: [
    NgForOf,
    UserCardComponent,
    AsyncPipe
  ],
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserListComponent {

  public readonly store = inject(Store);
  public readonly users = this.store.select(selectedUsers)

  readonly userCreateDialog = inject(MatDialog)

  constructor() {
    this.store.dispatch(loadUsers())
  }

  deleteUser(id: number) {
    this.store.dispatch(deleteUser({ id }))
  }

  editUser(user: User) {
    this.store.dispatch(updateUser({ user}))
  }

  createUser(): void {
    const userCreateDialogRef = this.userCreateDialog.open(CreateUserDialogComponent, {})

    userCreateDialogRef.afterClosed().subscribe(result => {
      if (!result) return
      this.store.dispatch(addUser({
        ...result,
        company: {
          name: result.companyName,
        }
      }))
    })
  }
}
