import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prod, ProdDocument } from './prods.schema';

@Injectable()
export class ProdService {
  constructor(@InjectModel(Prod.name) private prodModel: Model<ProdDocument>) {}

  async create(prod: Prod): Promise<Prod> {
    const newProd = new this.prodModel(prod)
    return newProd.save()
  }
}
