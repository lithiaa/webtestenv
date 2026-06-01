import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats() {
    const totalBarang = await this.prisma.item.count();

    const totalKategori = await this.prisma.category.count();

    const stokHabis = await this.prisma.item.count({
      where: {
        stock_amount: 0,
      },
    });

    const stokMenipis = await this.prisma.$queryRaw<Array<{ count: bigint }>>`
      SELECT COUNT(*) as count
      FROM item
      WHERE
        minimum_stock IS NOT NULL
        AND stock_amount > 0
        AND stock_amount <= minimum_stock
    `;

    return {
      totalBarang,

      totalKategori,

      stokMenipis: Number(stokMenipis[0].count),

      stokHabis,
    };
  }
}
