import { prisma } from "../../libs/prisma.lib";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const mitraCount = await prisma.users.count({
        where: {
          role: 'mitra',
        },
      });

      const lokerCounts = await prisma.loker.groupBy({
        by: ['mitraId'],
        _count: {
          _all: true,
        },
      });

      const mitraIds = lokerCounts.map((count) => count.mitraId);

      const mitras = await prisma.users.findMany({
        where: {
          role: 'mitra',
        },
        select: {
          id: true,
          name: true,
        },
      });

      const mitraMap = mitras.reduce((map, mitra) => {
        map[mitra.id] = mitra.name;
        return map;
      }, {});

      const datacount = {
        mitras: mitraCount,
        lokerCounts: mitras.map((mitra) => ({
          mitraId: mitra.id,
          name: mitra.name,
          count: lokerCounts.find((count) => count.mitraId === mitra.id)?._count._all || 0,
        })),
      };

      res.status(200).json({
        message: 'success',
        data: datacount,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}
