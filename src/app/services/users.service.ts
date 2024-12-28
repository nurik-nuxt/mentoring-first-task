import { Injectable } from "@angular/core";
import { User } from "../types/user.types";
import { BehaviorSubject } from "rxjs";
import { UsersApiService } from "./users-api.service";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userSubject = new BehaviorSubject<User[]>([]);
  public readonly users$ = this.userSubject.asObservable();

  constructor(
    private usersApiService: UsersApiService,
    private localStorageService: LocalStorageService
  ) {}

  saveUsersToLocalStorage(users: User[]) {
    this.localStorageService.setItem('users', JSON.stringify(users));
  }

  loadUser(): void {
    this.usersApiService.getUsers().subscribe(
      (users: any) => {
        this.userSubject.next(users);
        this.saveUsersToLocalStorage(users);
      }
    )
  }

  loadLocalUsers(): void {
    const storedUsers = this.localStorageService.getItem('users');
    if (storedUsers && storedUsers.length > 0) {
      try {
        const users = JSON.parse(storedUsers);
        if (users && users.length > 0) {
          this.userSubject.next(users)
        } else {
          this.loadLocalUsers()
        }
      } catch (error) {
        console.error('Ошибка парсинга хранимых пользователей:', error);
      }
    } else {
      this.loadUser();
    }
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
