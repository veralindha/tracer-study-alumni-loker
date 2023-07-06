import { prisma } from "../../../libs/prisma.lib";
import path from "path";
import multer from "multer";

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
    fileSize: 10000000, // 1 MB
  },
});

export default async function handler (req, res) {
  if (req.method === "POST") {
    upload.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      const { nama, persyaratan, mitraId } = req.body;
      const image = `/upload/${req.file.filename}`;
      const product = await prisma.loker.create({
        data: {
          nama,
          persyaratan,
          mitraId: parseInt(mitraId),
          image,
        },
      });
      return res.status(200).json({message: "success", data: product});
    });
  }
};
