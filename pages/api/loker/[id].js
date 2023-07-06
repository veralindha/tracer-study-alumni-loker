import { prisma } from "../../../libs/prisma.lib"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query
    await prisma.loker.findFirst({
      where: {
        id: parseInt(id),
      }
    })
      .then((loker) => {
        if(loker != null){
          res.status(200).json({
            message: 'success',
            data: loker
          })
        } else {
          res.status(404).json({
            message: 'not found',
            data: null
          })
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message
        })
      })
  }
}