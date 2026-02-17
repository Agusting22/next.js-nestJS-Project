import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto.js";
import { UpdateProductDto } from "./dto/update-product.dto.js";
import { PrismaService } from "../prisma/prisma.service.js";
import { Product } from "@prisma/client";
import { Prisma } from "@prisma/client";

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prismaService.product.create({
        data: createProductDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException(
            `Product with name ${createProductDto.name} already exists`,
          );
        }
      }
    }
  }

  async findAll(): Promise<Product[]> {
    return this.prismaService.product.findMany();
  }

  async findOne(id: number): Promise<Product> {
    const productFound = await this.prismaService.product.findUnique({
      where: { id: id },
    });

    if (!productFound) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return productFound;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const productFound = await this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });
    if (!productFound) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return productFound;
  }

  async remove(id: number): Promise<Product> {
    const deletedProduct = await this.prismaService.product.delete({
      where: { id: id },
    });
    return deletedProduct;
  }
}
