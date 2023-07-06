import { prisma } from "../../../libs/prisma.lib"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query
    await prisma.alumnis.findUnique({
      where: {
        nim: id,
      }
    })
      .then((alumni) => {
        if(alumni != null){
          res.status(200).json({
            message: 'success',
            data: alumni
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