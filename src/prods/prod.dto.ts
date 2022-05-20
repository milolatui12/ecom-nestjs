import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProductionRequestDto {

    @IsString()
    @IsOptional()
    name: string

    @IsNotEmpty()
    price: number

    @IsNotEmpty()
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