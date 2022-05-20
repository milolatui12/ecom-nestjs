import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ShopsModule } from './shops/shops.module';
import { ProdsModule } from './prods/prods.module';
import { CartsModule } from './carts/carts.module';
import { AuthModule } from './auth/auth.module';

const url = process.env.MONGO_HOST || 'localhost';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${url}:27017/ecom`),
    UsersModule,
    ShopsModule,
    ProdsModule,
    CartsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
