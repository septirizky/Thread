import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Thread } from 'src/app/interfaces/thread';

@Component({
  selector: 'app-threads-user',
  templateUrl: './threads-user.component.html',
  styleUrls: ['./threads-user.component.scss'],
})
export class ThreadsUserComponent {
  public id: any = localStorage.getItem('userId');
  threads: Thread[] = [];

  constructor(private activateRoute: ActivatedRoute) {
    this.activateRoute.params.subscribe((params) => {
      this.id = params['id'];
      console.log(this.id);
    });
  }
}
