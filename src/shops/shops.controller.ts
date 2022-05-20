import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { ShopsService } from './shops.service';
// import { CreateProdDto } from 'src/prods/prod.dto';
import { ProdService } from 'src/prods/prods.service';

@Controller('shops')
export class ShopsController {
  constructor(
    private readonly shopService: ShopsService,
    private readonly prodService: ProdService,
  ) {}

//   @Post('/:userId')
//   async createShop(@)

//   @Post('/:shopId/prod')
//   async createProd(@Param('shopId') shopId, @Body() prod: CreateProdDto, @Res() res: Response) {
//     try {
//       const newProd = await this.prodService.create(prod);
//       const newProdId = newProd._id.valueOf()
//       const updatedShop = await this.shopService.newProd(shopId, newProdId)
//         return res.status(HttpStatus.OK).send({
//             updatedShop
//         })
//     } catch (error) {
//         return res.status(HttpStatus.BAD_REQUEST).send({
//             msg: "something went wrong",
//             error
//         })
//     }
//   }

//   @Get(':productId/:userId')
//   async getProduct(@Param() params: GetProductParamsRequestDto)
}


//swaggert