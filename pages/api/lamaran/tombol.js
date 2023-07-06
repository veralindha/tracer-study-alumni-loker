import { prisma } from "../../../libs/prisma.lib"

export default async function handler(req, res) {
    const { id } = req.query;
    if(id) {
        prisma.lamaran.update({
            where: {
                id: parseInt(id),
                tombol: "enable",
            },
            data: {
                tombol: "disable",
            },
        });
        return res.status(200).json({message: "success"});
    } else if (id) {
        prisma.lamaran.update({
            where: {
                id: parseInt(id),
                tombol: "disable",
            },
            data: {
                tombol: "enable",
            },
        });
        return res.status(200).json({message: "success"});
    }
}