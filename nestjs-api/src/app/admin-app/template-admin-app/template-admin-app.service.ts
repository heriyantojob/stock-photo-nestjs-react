import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateStatusTemplateDto } from 'src/app/main-app/template/dto/update-status-template.dto';

import { Template } from 'src/app/main-app/template/template.entity';
import { Repository } from 'typeorm';
import * as slug from "slug"
import { UpdateTemplateInAdminDto } from './dto/update-template-in-admin.dto';

@Injectable()
export class TemplateAdminAppService {

   
 

}
