import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Prod } from "src/prods/prods.schema";

export type CartDocument = Cart & Document

@Schema()
export class Cart {
    @Prop({ type: mongoose.Schema.Types.ObjectId})
    buyerId: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Prod'})
    prod: Prod

    @Prop()

    @Prop()
    quantity: number
}

export const CartSchema = SchemaFactory.createForClass(Cart)