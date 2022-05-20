import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { type } from 'os';

export type ShopsDocument = Shops & Document;

@Schema()
export class Shops {
  @Prop()
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  prodIds: string[];
}

export const ShopsSchema = SchemaFactory.createForClass(Shops);
