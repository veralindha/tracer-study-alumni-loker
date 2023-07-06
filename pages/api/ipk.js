import { prisma } from "../../libs/prisma.lib";

export default async function handler(req, res) {
  try {
    if(req.method === 'GET'){
      const alumnis = await prisma.alumnis.findMany();
      if(alumnis && alumnis.length > 0){
        let ipk = alumnis.map((alumni) => {
          return parseInt(alumni.ipk)
        });
        let meanIpk = ipk.reduce((a, b) => a + b, 0) / ipk.length;
        res.status(200).json({message: 'success', data: {rerata_ipk: meanIpk}});
      } else {
        res.status(404).json({message: 'Not Found'});
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "Error occured, contact your Administrator for more information.",
      error: error.message
    });
  }
}