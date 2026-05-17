import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category not found`);
    }

    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  async remove(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category not found`);
    }

    return this.prisma.category.delete({
      where: { id },
    });
  }

  async findOne(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
    });
  }

  async findAll(
    page: number,
    limit: number,
    sortBy: string,
    order: 'asc' | 'desc',
    search: string,
  ) {
    const skip = (page - 1) * limit;
    const where = {
      category_name: {
        contains: search,
      },
    };
    const total = await this.prisma.category.count({
      where,
    });
    
    const categories = await this.prisma.category.findMany({
      where,
      skip,
      take: limit,
      include: {
        _count: {
          select: { items: true },
        },
      },
      orderBy: {
        [sortBy]: order,
      },
    });

    return {
      data: categories.map((category) => ({
        id: category.id,
        category_name: category.category_name,
        description: category.description,
        createdAt: category.createdAt.toISOString().split('T')[0],
        itemCount: category._count.items,
      })),
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }
}
