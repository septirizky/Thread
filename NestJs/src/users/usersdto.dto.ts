import {
  IsEmpty,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUsersDto {
  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  @IsString({
    message: 'Username harus berupa string!',
  })
  @Matches(/[a-zA-Z0-9]+$/, {
    message: 'Username $value tidak sesuai validasi, hanya boleh abjad',
  })
  username: string;

  @IsString()
  email: string;

  @IsNotEmpty({ message: 'Password tidak boleh kosong!' })
  @IsString({ message: 'Password harus berupa string!' })
  @MinLength(6, { message: 'Password harus lebih dari 6 karakter' })
  password: string;

  @IsEmpty()
  image: string;
}

export class UpdateUsersDto {
  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  @IsString()
  @Matches(/[a-zA-Z0-9]+$/, {
    message: 'Username $value tidak sesuai validasi, hanya boleh abjad',
  })
  username: string;

  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password minimal 6 huruf' })
  password: string;

  image: string;
  static image: string;

  @IsNotEmpty()
  oldImage: string;
}
