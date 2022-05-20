import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shops, ShopsDocument } from './shops.schema';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(Shops.name) private shopModel: Model<ShopsDocument>,
  ) {}

  async create(shop: Shops) {
    const newShop = new this.shopModel(shop)
    return newShop.save()
  }

  async newProd(shopId, prodId) {
    return await this.shopModel.updateOne(
      { _id: shopId },
      { $push: { prodIds: prodId } },
    );
  }
}
