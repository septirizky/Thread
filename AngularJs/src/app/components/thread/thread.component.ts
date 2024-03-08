import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Thread } from 'src/app/interfaces/thread';
import { ThreadService } from 'src/app/services/thread.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent implements OnInit {
  threads: Thread[] = [];

  constructor(private threadService: ThreadService, private router: Router) {}

  ngOnInit(): void {
    this.getThreads();
  }

  getThreads() {
    this.threadService.getThreads().subscribe({
      next: (v) => (this.threads = v),
      error: (e) => console.error(e),
      complete: () => console.info('complete'),
    });
  }

  isExpanded = signal(false);
  isReplying = signal(false);

  toggleReplying() {
    this.isReplying.set(!this.isReplying());
    if (this.isReplying()) {
      this.isExpanded.set(true);
    }
  }

  toggleExpanded() {
    this.isExpanded.set(!this.isExpanded());
  }
}
