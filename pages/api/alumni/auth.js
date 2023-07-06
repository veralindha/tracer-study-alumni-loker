import { prisma } from "../../../libs/prisma.lib"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { nim, password } = req.body
    await prisma.alumnis.findUnique({
      where: {
        nim: nim,
      }
    })
      .then((alumni) => {
        if(alumni != null && alumni.password === password){
          res.status(200).json({
            message: 'success',
            data: alumni
          })
        } else {
          res.status(401).json({
            message: 'unauthorized',
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