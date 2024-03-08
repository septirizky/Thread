import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit {
  userService = inject(UserService);
  users: User[] = [];

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (v) => (this.users = v),
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
