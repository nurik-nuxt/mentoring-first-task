import { inject, Injectable} from "@angular/core";
import { User } from "../types/user.types";
import { BehaviorSubject } from "rxjs";
import { UsersApiService } from "./users-api.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userSubject = new BehaviorSubject<User[]>([]);

  private usersApiService = inject(UsersApiService);
  private localStorageService = inject(LocalStorageService);

  saveUsersToLocalStorage(users: User[]) {
    this.localStorageService.setItem('users', JSON.stringify(users));
  }

  loadUser(): void {
    this.usersApiService.getUsers().subscribe(
      (users: User[]) => {
        this.userSubject.next(users);
        this.saveUsersToLocalStorage(users);
      }
    )
  }

  deleteUser(id: number) {
    const users = [...this.userSubject.value];
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      this.userSubject.next(users);
      this.saveUsersToLocalStorage(users);
    }
  }

  setUsers(users: User[]) {
    this.userSubject.next(users)
  }

  editUser(editedUser: User) {
    const users = this.userSubject.value.map(user  => user.id === editedUser.id ? editedUser: user)
    this.userSubject.next(users);
    this.saveUsersToLocalStorage(users)
  }

  createUser(newUser: User) {
    const users = [...this.userSubject.value, newUser];
    this.userSubject.next(users);
    this.saveUsersToLocalStorage(users);
  }
}
