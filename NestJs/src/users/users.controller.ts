import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
  Response,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto, UpdateUsersDto } from './usersdto.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOption } from 'src/auth/multer';
import * as fs from 'fs';
import { errorHandling } from 'src/helper/errorHandling';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', MulterOption))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
    @Body() fields: CreateUsersDto,
  ) {
    try {
      if (req.errorvalidatefile) {
        throw new Error(req.errorvalidatefile);
      }
      if (file) {
        fields.image =
          req.protocol + '://' + req.get('host') + '/users/' + file.filename;
      } else {
        fields.image =
          req.protocol + '://' + req.get('host') + '/users/noavatar.png';
      }
      return this.usersService.create(fields);
    } catch (error) {
      return errorHandling(400, error.message);
    }
  }

  @Get(':imgpath')
  getImage(@Param('imgpath') img: any, @Response() res: any) {
    res.sendFile(img, { root: './assets' });
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', MulterOption))
  update(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
    @Body() fields: UpdateUsersDto,
  ) {
    const oldImageBody = fields.oldImage;
    const oldImageName = oldImageBody.split('/').pop();
    if (file) {
      fields.image = `${req.protocol}://${req.hostname}:${process.env.port}/users/${file.filename}`;

      if (oldImageName !== 'noavatar.png') {
        fs.unlinkSync(`./assets/${oldImageName}`);
      }
    } else {
      fields.image = `${req.protocol}://${req.get('host')}/users/noavatar.png`;
      if (oldImageName !== 'noavatar.png') {
        fs.unlinkSync(`./assets/${oldImageName}`);
      }
    }
    return this.usersService.update(+id, fields);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() filename: any) {
    if (filename.path != 'noavatar.png') {
      const path = './assets/' + filename.path;
      fs.unlinkSync(path);
    }
    return this.usersService.remove(+id);
  }
}
