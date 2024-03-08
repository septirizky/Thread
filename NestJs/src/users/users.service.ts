import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { CreateUsersDto, UpdateUsersDto } from './usersdto.dto';
import { errorHandling } from 'src/helper/errorHandling';
import { users } from 'model';

@Injectable()
export class UsersService {
  // constructor(private readonly SQ: Sequelize) {}

  async create(fields: CreateUsersDto) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const passhash = bcrypt.hashSync(fields.password, salt);
      const result = await users.create({
        username: fields.username,
        email: fields.email,
        password: passhash,
        image: fields.image,
      });
      return result;
    } catch (error) {
      return `error.message`;
    }
  }

  async findAll() {
    try {
      const result = await users.findAll();
      return result;
    } catch (error) {
      return `error.message`;
    }
  }

  async findOne(id: number) {
    try {
      const result = await users.findOne({ where: { user_id: id } });
      return result;
    } catch (error) {
      return `error.message`;
    }
  }

  async update(id: number, fields: UpdateUsersDto) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const passhash = bcrypt.hashSync(fields.password, salt);
      const result = await users.update(
        {
          username: fields.username,
          email: fields.email,
          password: passhash,
          image: fields.image,
        },
        {
          where: { user_id: id },
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
      const result = await users.destroy({ where: { user_id: id } });
      return errorHandling(200, 'sukses', result);
    } catch (error) {
      return errorHandling(400, error.message);
    }
  }
}
