import { prisma } from '../../../libs/prisma.lib'

export default async function handler(req, res) {
  const { query: { nim } } = req
  if (req.method === 'POST') {
    if (req.body.answers && req.body.answers.length > 0) {
      const answers = req.body.answers.map((answer) => {
        return {
          answer: answer.answer,
          alumnisId: answer.alumniId,
          question_code: answer.question_code,
        }
      })
      answers.forEach(ans => {
        setTimeout(async () => {
          await prisma.answers.create({
            data: ans,
          })
            .catch((err) => {
              res.status(400).json({ message: 'failed', error: err.message })
            })
        }, 1000)
      });
      await prisma.alumnis.update({
        where: {
          nim: nim,
        },
        data: {
          tracered: "true",
        }
      })
        .then((data) => {
          res.status(200).json({ message: 'success' })
        })
        .catch((err) => {
          res.status(400).json({ message: 'failed', error: err.message })
        })
    } else {
      res.status(400).json({ message: 'answer is required' })
    }
  }
  if (req.method === 'GET') {
    await prisma.answers.findMany({
      where: {
        alumnisId: parseInt(nim),
      },
      include: {
        alumnis: true,
      }
    })
      .then((data) => {
        res.status(200).json({ message: 'success', data: data })
      })
      .catch((err) => {
        res.status(400).json({ message: 'failed', error: err.message })
      })
  }
}