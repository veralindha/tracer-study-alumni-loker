import { prisma } from "../../libs/prisma.lib";

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      await prisma.alumnis.findMany()
        .then(result => {
          res.status(200).json({
            message: 'available',
            data: result
          })
        })
        .catch(err => {
          res.status(500).json({
            message: err
          })
        })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}