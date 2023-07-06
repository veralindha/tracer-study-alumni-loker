import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const alumnis = req.body.alumnis;
      const data = alumnis.map((alumni) => {
        return {
          nim: alumni.nim,
          nik: alumni.no_ktp ? alumni.no_ktp : "-",
          npwp: "-",
          nama: alumni.nama_mhs,
          gender: alumni.kelamin,
          angkatan: alumni.angkatan,
          lulus: alumni.thn_lulus,
          alamat: alumni.alamat,
          telepon: alumni.tlp_saya,
          email: alumni.email,
          password: alumni.nim,
        };
      });

      const prisma = new PrismaClient();
      const insert = await prisma.alumnis.createMany({
        data: data,
        skipDuplicates: true,
      });

      await prisma.$disconnect();

      if (insert) {
        res.status(201).json({ message: "success", data: insert });
      } else {
        throw new Error("Failed to insert data into the database.");
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Error occurred, contact your Administrator for more information.",
      error: error.message,
    });
  }
}
