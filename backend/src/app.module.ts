import { Module } from "@nestjs/common";
import { ProductsModule } from "./products/products.module.js";
import { PrismaModule } from "./prisma/prisma.module.js";

@Module({
  imports: [ProductsModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
