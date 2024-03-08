import { IsNotEmpty } from 'class-validator';

export class CreateThreadsDto {
  @IsNotEmpty({ message: 'Threads tidak boleh kosong' })
  thread_post: string;

  @IsNotEmpty()
  thread_user_id: number;
}

export class UpdateThreadsDto {
  @IsNotEmpty({ message: 'Threads tidak boleh kosong' })
  thread_post: string;

  thread_user_id: number;
}
