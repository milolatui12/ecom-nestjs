import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Prod, ProdSchema } from './prods.schema';
import { ProdService } from './prods.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Prod.name, schema: ProdSchema }]),
  ],
  providers: [ProdService],
  exports: [ProdService]
})
export class ProdsModule {}
