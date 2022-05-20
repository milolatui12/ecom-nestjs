import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type ProdDocument = Prod & Document

@Schema()
export class Prod {
    @Prop()
    name: string

    @Prop()
    price: number

    @Prop()
    stock: number
}

export const ProdSchema = SchemaFactory.createForClass(Prod)

