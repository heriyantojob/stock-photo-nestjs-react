import { IsNumber, Min, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UserAdminAppParams {
    email?: string;
    status?: number;
    contributor?: number;
    contributor_unlimited?: number;
}