import {prisma} from "../../../libs/prisma.lib"

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { username, password } = req.body
    await prisma.alumnis.update({
      where: {
        nim: username
      },
      data: {
        password: password
      }
    })
      .then((user) => {
        res.status(201).json({
          message: `Data user berhasil diubah!`,
          data: user
        })
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message
        })
      })
  }
}