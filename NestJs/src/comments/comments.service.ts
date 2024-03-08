import { Injectable } from '@nestjs/common';
import { CreateCommentsDto, UpdateCommentsDto } from './commentsdto.dto';
import { errorHandling } from 'src/helper/errorHandling';
import { comments, threads, users } from 'model';

@Injectable()
export class CommentsService {
  async create(fields: CreateCommentsDto) {
    try {
      const result = await comments.create({
        comment: fields.comment,
        comment_user_id: fields.comment_user_id,
        comment_thread_id: fields.comment_thread_id,
      });
      return errorHandling(200, 'sukses', result);
    } catch (error) {
      return errorHandling(400, error.message);
    }
  }

  async findAll() {
    try {
      const result = await comments.findAll({
        include: [
          {
            model: users,
            required: true,
            attributes: ['username'],
          },
          {
            model: threads,
            include: [
              {
                model: users,
                attributes: ['username'],
              },
            ],
            attributes: ['thread_post', 'thread_user_id'],
          },
        ],
      });
      return result;
    } catch (error) {
      return `error.message`;
    }
  }

  async update(id: number, fields: UpdateCommentsDto) {
    try {
      const result = await comments.update(
        {
          comment: fields.comment,
        },
        {
          where: { comment_id: id },
          returning: true,
        },
      );
      return errorHandling(200, 'sukses', result);
    } catch (error) {
      return errorHandling(400, error.message);
    }
  }

  async remove(id: number) {
    try {
      const result = await comments.destroy({ where: { comment_id: id } });
      return errorHandling(200, 'sukses', result);
    } catch (error) {
      return errorHandling(400, error.message);
    }
  }
}
