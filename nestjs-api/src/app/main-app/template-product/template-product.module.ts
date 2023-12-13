import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateProductController } from './template-product.controller';
import { TemplateProductService} from './template-product.service';
import { TemplateProduct } from './template-product.entity';


@Module({
    imports: [TypeOrmModule.forFeature([TemplateProduct])],
  controllers: [TemplateProductController],
  providers: [TemplateProductService]
})
export class TemplateProductModule {
    
}
