import { prisma } from "../../../libs/prisma.lib"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query
    await prisma.users.findUnique({
      where: {
        username: id,
        password: req.body.password
      }
    })
      .then((user) => {

      })
      .catch((err) => {
        res.status(500).json({
          message: err.message
        })
      })
  }
}