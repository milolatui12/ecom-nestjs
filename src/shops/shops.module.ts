import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Shops, ShopsSchema } from './shops.schema';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { ProdsModule } from 'src/prods/prods.module';
import { ProdService } from 'src/prods/prods.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Shops.name, schema: ShopsSchema }]),
    ProdsModule
  ],
  providers: [ShopsService, ],
  controllers: [ShopsController]
})
export class ShopsModule {}
