import { prisma } from "../../libs/prisma.lib";

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let datacount = {
        alumnis: await prisma.alumnis.count(),
        tracered: await prisma.alumnis.count({
          where: {
            tracered: 'true'
          }
        }),
        untracered: await prisma.alumnis.count({
          where: {
            tracered: 'false'
          }
        }),
        alumnis17: await prisma.alumnis.count({
          where: {
            lulus: '2017'
          }
        }),
        alumnis18: await prisma.alumnis.count({
          where: {
            lulus: '2018'
          }
        }),
        alumnis19: await prisma.alumnis.count({
          where: {
            lulus: '2019'
          }
        }),
        alumnis20: await prisma.alumnis.count({
          where: {
            lulus: '2020'
          }
        }),
        alumnis21: await prisma.alumnis.count({
          where: {
            lulus: '2021'
          }
        }),
        alumnis22: await prisma.alumnis.count({
          where: {
            lulus: '2022'
          }
        }),
        bekerja : await prisma.answers.count({
          where: {
            answer: 'YA' ,
            question_code: 'Q3'
          }
        }),
        tidakBekerja : await prisma.answers.count({
          where: {
            answer: '' ,
            question_code: 'Q3'
          }
        }),
        rataTunggu : await prisma.answers.count({
          where: {
            question_code: 'Q1',
            answer: 'sesudah'
          }
        }),
      }

      const jumlahAlumni = datacount.alumnis;
      const rataTunggu = datacount.rataTunggu;
      const rataTungguRataRata = jumlahAlumni > 0 ? rataTunggu / jumlahAlumni : 0;

      datacount.rataTungguRataRata = rataTungguRataRata;

      res.status(200).json({
        message: 'available',
        data: datacount
      });
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
}
