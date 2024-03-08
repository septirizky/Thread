import { Injectable } from '@nestjs/common';
import { errorHandling } from 'src/helper/errorHandling';
import { CreateThreadsDto, UpdateThreadsDto } from './threadsdto.dto';
import { threads, users } from 'model';

@Injectable()
export class ThreadsService {
  async create(fields: CreateThreadsDto) {
    try {
      const result = await threads.create({
        thread_post: fields.thread_post,
        thread_user_id: fields.thread_user_id,
      });
      return errorHandling(200, 'sukses', result);
    } catch (error) {
      return errorHandling(400, error.message);
    }
  }

  async findAll() {
    try {
      const result = await threads.findAll({
        include: [
          {
            model: users,
            required: true,
            attributes: ['username', 'email'],
          },
        ],
      });
      return result;
    } catch (error) {
      return `error.message`;
    }
  }

  async threadUser(id: number) {
    try {
      const result = await threads.findAll({
        where: { thread_user_id: id },
      });
      return result;
    } catch (error) {
      return `error.message`;
    }
  }

  async update(id: number, fields: UpdateThreadsDto) {
    try {
      const result = await threads.update(
        {
          thread_post: fields.thread_post,
        },
        {
          where: { thread_id: id },
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
      const result = await threads.destroy({ where: { thread_id: id } });
      return errorHandling(200, 'sukses', result);
    } catch (error) {
      return errorHandling(400, error.message);
    }
  }
}
