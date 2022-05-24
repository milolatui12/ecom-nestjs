import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductionRequestDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    price: number

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    stock: number
}

//create, update, getById
export class ProductResponseDto {

}

// export class GetProductParamsRequestDto {

//     @IsMongoId()
//     @IsNotEmpty()
//     @ApiProperty()
//     userId: string

//     @IsMongoId()
//     @IsNotEmpty()
//     @ApiProperty()
//     productId: string
// }