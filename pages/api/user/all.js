import { prisma } from "../../../libs/prisma.lib"

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { role } = req.query
      if (!role) {
      await prisma.users.findMany()
        .then((users) => {
          if (users.length == 0) {
            res.status(200).json({
              message: 'unavailable',
              data: users
            })
          } else {
            res.status(200).json({
              message: 'available',
              data: users
            })
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message
          })
        });
      } else {
        await prisma.users.findMany({
          where: {
            role: role
          }
        })
        .then((users) => {
          if (users.length == 0) {
            res.status(200).json({
              message: 'unavailable',
              data: users
            })
          } else {
            res.status(200).json({
              message: 'available',
              data: users
            })
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message
          })
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  }
}