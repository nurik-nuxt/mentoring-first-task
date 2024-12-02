import {ChangeDetectionStrategy, Component, inject} from "@angular/core";
import {AsyncPipe, NgForOf} from "@angular/common";
import {UserCardComponent} from "./user-card/user-card.component";
import {UsersService} from "../services/users.service";
import {User} from "../types/user.types";
import {MatDialog} from "@angular/material/dialog";
import {CreateUserDialogComponent} from "./create-user-dialog/create-user-dialog.component";
import {Store} from "@ngrx/store";
import { selectedUsers } from "../state/users/users.selectors";

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
  readonly usersService = inject(UsersService);

  public readonly users = this.usersService.users$;

  public readonly store = inject(Store);
  public readonly users$ = this.store.select(selectedUsers)

  readonly userCreateDialog = inject(MatDialog)

  constructor() {
    this.usersService.loadLocalUsers();
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id);
  }

  editUser(user: User) {
    this.usersService.editUser({
      ...user,
      company: {
        name: user.companyName
      }
    });
  }

  createUser(): void {
    const userCreateDialogRef = this.userCreateDialog.open(CreateUserDialogComponent, {})

    userCreateDialogRef.afterClosed().subscribe(result => {
      console.log('Успешно закрыто Форма', result)
      if (!result) return
      this.usersService.createUser({
        ...result,
        company: {
          name: result.companyName
        }
      })
    })
  }
}
