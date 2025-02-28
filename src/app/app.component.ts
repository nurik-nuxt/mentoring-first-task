import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { UsersListComponent } from './user-list/users-list.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UsersListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mentoring-first-project'
}
