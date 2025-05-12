import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from '../user.entity';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên không được để trống' })
  name: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;
  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  @Matches(/^(?=.*[A-Z])(?=.*[^A-Za-z0-9])/, {
    message: 'Mật khẩu phải có ít nhất 1 chữ in hoa và 1 ký tự đặc biệt',
  })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;

  @IsEnum(Role, { message: 'Role phải là "user" hoặc "admin"' })
  role: Role;
}
