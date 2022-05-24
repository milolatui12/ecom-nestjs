import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductionRequestDto } from './prod.dto';
import { Prod, ProdDocument } from './prods.schema';

@Injectable()
export class ProdService {
  constructor(@InjectModel(Prod.name) private prodModel: Model<ProdDocument>) {}

  async create(body: CreateProductionRequestDto): Promise<Prod> {
    return this.prodModel.create(body)
  }
}
