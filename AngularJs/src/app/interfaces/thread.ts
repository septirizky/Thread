import { User } from './user';

export interface Thread {
  thread_id: number;
  thread_post: string;
  user: User;
}
