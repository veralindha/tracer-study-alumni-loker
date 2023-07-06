import multer from "multer";
import { prisma } from "../../../libs/prisma.lib";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/upload",
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext);
      cb(null, `${name}-${Date.now()}${ext}`);
    },
  }),
  limits: {
    fileSize: 100000000, // 1 MB
  },
});

export default async function handler(req, res) {
  try {
    if (req.method === "PUT") {
      upload.single("image")(req, res, (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        const { id, nama, persyaratan, mitraId, image } = req.body;
        const images = req.file ? `/upload/${req.file.filename}` : image; // Periksa jika req.file ada sebelum menggunakan req.file.filename

        prisma.loker
          .update({
            where: {
              id: parseInt(id),
            },
            data: {
              nama,
              persyaratan,
              mitraId: parseInt(mitraId),
              image: images,
            },
          })
          .then((result) => {
            res.status(200).json({ message: "success", data: result });
          })
          .catch((err) => {
            res.status(400).json({ message: err.message });
          });
      });
    } else {
      res.status(400).json({ message: "Bad Request" });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
