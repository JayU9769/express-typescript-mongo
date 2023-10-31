import {IsString, IsNotEmpty, MinLength, MaxLength, IsEnum} from 'class-validator';
import {Transform} from "class-transformer";
import {EGuard} from "@interfaces/roles.interface";

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  public name: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => ("" + value).toLowerCase())
  @IsEnum(EGuard)
  public guard: EGuard;
}
