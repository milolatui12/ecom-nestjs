import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role }  from './roles/role.enum'

export type UsersDocument = Users & Document

@Schema()
export class Users {
    @Prop()
    firstName: string
    
    @Prop()
    lastName: string

    @Prop()
    fullName: string

    @Prop()
    email: string

    @Prop()
    password: string

    @Prop()
    phoneNumber: string

    @Prop()
    role: Role
}

export const UsersSchema = SchemaFactory.createForClass(Users)