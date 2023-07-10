import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail, IsNumber, IsEnum, IsOptional, IsArray, ArrayMinSize } from 'class-validator';
import { Match } from '@dtos/decorators/match.decorator';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  public name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(32)
  public username: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(15)
  public phone_no: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(32)
  @Match('password')
  public passwordConfirm: string;

  @IsNumber()
  @IsEnum([0, 1])
  public status: number;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  public roles: string[];
}

export class UpdateAdminDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(32)
  public name: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(32)
  public username: string;

  @IsEmail()
  @IsOptional()
  public email: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  @MaxLength(15)
  public phone_no: string;

  @IsString()
  @IsOptional()
  @MinLength(9)
  @MaxLength(32)
  public password: string;

  @IsNumber()
  @IsOptional()
  @IsEnum([0, 1])
  public status: number;

  @IsArray()
  @IsString({ each: true })
  public roles: string[];
}
