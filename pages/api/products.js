import { PrismaClient } from "@prisma/client";


export default async function handler(req, res) {
  if (req.method == "GET"){
    const prisma = new PrismaClient();
    try {
      const products = await prisma.product.findMany({
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          link: true,
          categoryId: true,
          photos: {
            select: {
              url: true
            }
          }
        }
      });
      return res.status(200).json(products);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "لقد حدث خطأ ما" });
    }
  }
}