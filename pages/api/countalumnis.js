import { prisma } from "../../libs/prisma.lib";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const mitraCount = await prisma.users.count({
        where: {
          role: 'mitra',
        },
      });

      const lamaranCounts = await prisma.lamaran.groupBy({
        by: ['mitraId'],
        _count: {
          _all: true,
        },
      });

      const lamaranIds = lamaranCounts.map((count) => count.mitraId);

      const mitraIds = lamaranCounts.map((lamaran) => lamaran.mitraId);

      const mitras = await prisma.users.findMany({
        where: {
          role: 'mitra',
        },
        select: {
          id: true,
          name: true,
        },
      });

      const datacount = {
        mitras: mitraCount,
        lamaranCounts: mitras.map((mitra) => ({
          mitraId: mitra.id,
          name: mitra.name,
          count: lamaranCounts.find((count) => count.mitraId === mitra.id)?._count._all || 0,
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
