import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async create(createItemDto: CreateItemDto, filename?: string) {
    return this.prisma.item.create({
      data: {
        ...createItemDto,
        item_picture: filename,
      },
    });
  }

  async update(
    id: number,
    updateItemDto: UpdateItemDto,
    file?: Express.Multer.File,
  ) {
    const item = await this.prisma.item.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    console.log(updateItemDto);

    return this.prisma.item.update({
      where: { id },

      data: {
        item_name: updateItemDto.item_name,

        categoryId: updateItemDto.categoryId,

        stock_amount: updateItemDto.stock_amount,

        minimum_stock: updateItemDto.minimum_stock,

        selling_price: updateItemDto.selling_price,

        purchase_price: updateItemDto.purchase_price,

        unit: updateItemDto.unit,

        weight_size: updateItemDto.weight_size,

        save_location: updateItemDto.save_location,

        description: updateItemDto.description,

        ...(file && {
          item_picture: file.filename,
        }),
      },
    });
  }

  async remove(id: number) {
    const item = await this.prisma.item.findUnique({
      where: { id },
    });

    if (!item) {
      throw new NotFoundException('Item not found');
    }

    return this.prisma.item.delete({
      where: { id },
    });
  }

  async findAll(
    page: number,
    limit: number,
    sortBy: string,
    order: 'asc' | 'desc',
    search: string,
    categoryId: string,
  ) {
    const skip = (page - 1) * limit;
    const where = {
      ...(search && {
        item_name: {
          contains: search,
        },
      }),

      ...(categoryId && {
        categoryId: Number(categoryId),
      }),
    };
    const total = await this.prisma.item.count({
      where,
    });
    const items = await this.prisma.item.findMany({
      where,
      skip,
      take: limit,

      include: {
        category: true,
      },

      orderBy: {
        [sortBy]: order,
      },
    });

    const mappedItems = items.map((item) => ({
      id: item.id,
      item_name: item.item_name,

      categoryId: item.categoryId,

      category_name: item.category?.category_name || null,

      stock_amount: item.stock_amount,

      minimum_stock: item.minimum_stock,

      selling_price: item.selling_price,

      purchase_price: item.purchase_price,

      weight_size: item.weight_size,

      unit: item.unit,

      save_location: item.save_location,

      description: item.description,

      item_picture: item.item_picture,

      createdAt: item.createdAt,
    }));

    return {
      data: mappedItems,

      total,

      page,

      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    return this.prisma.item.findUnique({
      where: { id },
    });
  }

  async findByCategory(categoryId: number) {
    return this.prisma.item.findMany({
      where: {
        categoryId,
      },

      include: {
        category: true,
      },
    });
  }
}
