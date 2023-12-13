import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateProductLangController } from './template-product-lang.controller';
import { TemplateProductLangService} from './template-product-lang.service';
import { TemplateProductLang } from './template-product-lang.entity';
@Module({
    imports: [TypeOrmModule.forFeature([TemplateProductLang])],
    controllers: [TemplateProductLangController],
    providers: [TemplateProductLangService]
})
export class TemplateProductLangModule {}
