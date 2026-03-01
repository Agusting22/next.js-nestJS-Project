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
      const data = { ...createProductDto };
      if (data.installments && data.installments > 0) {
        data.installmentAmount = data.price / data.installments;
      }

      return await this.prismaService.product.create({
        data,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException(
            `Product with name ${createProductDto.name} already exists`,
          );
        }
      }
      throw error;
    }
  }

  async findAll(search?: string): Promise<Product[]> {
    if (!search) {
      return this.prismaService.product.findMany();
    }

    return this.prismaService.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
      },
    });
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
    const data = { ...updateProductDto };
    if (data.installments && data.installments > 0) {
      if (!data.price) {
        const currentProduct = await this.prismaService.product.findUnique({
          where: { id },
        });
        if (currentProduct) {
          data.installmentAmount = currentProduct.price / data.installments;
        }
      } else {
        data.installmentAmount = data.price / data.installments;
      }
    } else if (data.price && !data.installments) {
      const currentProduct = await this.prismaService.product.findUnique({
        where: { id },
      });
      if (currentProduct?.installments && currentProduct.installments > 0) {
        data.installmentAmount = data.price / currentProduct.installments;
      }
    }

    const productFound = await this.prismaService.product.update({
      where: { id },
      data,
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
