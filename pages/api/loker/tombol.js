import { prisma } from "../../../libs/prisma.lib";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (!id) {
      return res.status(400).json({ message: "ID tidak valid." });
    }

    const loker = await prisma.loker.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!loker) {
      return res.status(404).json({ message: "Lowongan kerja tidak ditemukan." });
    }

    const updatedTombol = loker.tombol === "enable" ? "disable" : "enable";

    const updatedLoker = await prisma.loker.update({
      where: {
        id: parseInt(id),
      },
      data: {
        tombol: updatedTombol,
      },
    });

    return res.status(200).json({ message: "success", data: updatedLoker });
  } catch (error) {
    console.error("Error updating tombol:", error);
    return res.status(500).json({ message: "Terjadi kesalahan dalam mengupdate tombol." });
  }
}
