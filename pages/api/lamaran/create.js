//how to api lamaran create to tabel lamaran (field: id, lokerId, alumnisId, berkas(file))
import { prisma } from "../../../libs/prisma.lib"
import multer from 'multer'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/file",
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(null, `${name}-${Date.now()}${ext}`);
    },
  }),
  limits: {
    //size 10mb
    fileSize: 10000000,
  },
});

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      upload.single("berkas")(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        const { lokerId, alumnisId, mitraId } = req.body;
        const berkas = `/file/${req.file.filename}`;
        const lamaran = prisma.lamaran.create({
          data: {
            berkas,
            alumnisId: parseInt(alumnisId),
            lokerId: parseInt(lokerId),
            mitraId: parseInt(mitraId)
          },
        })
          .then((lamaran) => {
            res.status(200).json({ message: 'success', data: lamaran });
          })
      });
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error });
  }

}
