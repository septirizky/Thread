import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { LoginDto } from './logindto.dto';
import { errorHandling } from 'src/helper/errorHandling';
import { users } from 'model';

@Injectable()
export class LoginService {
  async login(loginData: LoginDto) {
    try {
      const user = await users.findOne({
        where: {
          username: loginData.username,
        },
      });
      if (!user) {
        return errorHandling(404, 'Username tidak ditemukan');
      } else {
        if (bcrypt.compareSync(loginData.password, user.password)) {
          const token = jwt.sign(
            { username: user.username },
            process.env.SECRET_KEY,
          );
          return errorHandling(200, 'Sukses', { data: user, token: token });
        } else {
          return errorHandling(401, 'Password salah');
        }
      }
    } catch (error) {
      return `error.message`;
    }
  }
}
