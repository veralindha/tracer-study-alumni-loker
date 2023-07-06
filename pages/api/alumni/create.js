import { prisma } from "../../../libs/prisma.lib"

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      let inputdata = {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
      }
      await prisma.users.create({
        data: {
          name: inputdata.username,
          username: inputdata.username,
          password: inputdata.password,
          role: inputdata.role
        }
      })
        .then((user) => {
          res.status(201).json({
            message: `User ${user.username} berhasil ditambahkan!`,
            data: user
          })
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message
          })
        })
    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  }
}