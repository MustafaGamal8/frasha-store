import { PrismaClient } from "@prisma/client";



export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method == "GET") {

    try {
      const products = await prisma.product.count();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: "لقد حدث خطأ ما" });
    }

  }else{
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
