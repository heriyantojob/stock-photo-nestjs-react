import { IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class TempalateAdminAppParams {
  keyword?: string;
  email_user?: string;
  status?: number;
  type_template?: number;
}