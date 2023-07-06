import { prisma } from "../../../libs/prisma.lib";

export default async function handler(req, res) {
  try {
    const { mitraId } = req.query;
    if(req.method === 'GET') {
      if (mitraId) {
        await prisma.loker.findMany({
          where: {
            mitraId: parseInt(mitraId)
          },
          select: {
            id: true,
            nama: true,
            persyaratan: true,
            image: true,
            tombol: true
          }
        })
          .then((loker) => {
            if (loker.length == 0) {
              res.status(200).json({
                message: 'unavailable',
                data: loker
              })
            } else {
              res.status(200).json({
                message: 'available',
                data: loker
              })
            }
          });
      } else {
        await prisma.loker.findMany({
          include:{
            user: true
          }
        })
          .then((loker) => {
            if (loker.length == 0) {
              res.status(200).json({
                message: 'unavailable',
                data: loker
              })
            } else {
              res.status(200).json({
                message: 'available',
                data: loker
              })
            }
          });
      }
    } else {
      res.status(400).json({message: 'Bad Request'});
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: error.message
    });
  }
}