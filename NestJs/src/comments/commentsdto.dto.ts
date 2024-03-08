import { IsNotEmpty } from 'class-validator';

export class CreateCommentsDto {
  @IsNotEmpty({ message: 'Comment tidak boleh kosong' })
  comment: string;

  @IsNotEmpty()
  comment_user_id: number;

  @IsNotEmpty()
  comment_thread_id: number;
}

export class UpdateCommentsDto {
  @IsNotEmpty({ message: 'Comment tidak boleh kosong' })
  comment: string;

  comment_user_id: number;

  comment_thread_id: number;
}
