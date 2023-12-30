import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const prisma = new PrismaClient();
    const productsIds = req.body.productsIds
    try {
      const products = await prisma.product.findMany(
        {
          where: {
            id: {
              in: productsIds
            }
          },
          select: {
            id: true,
            name: true,
            price: true,
            categoryId: true,
            link: true,
            photos: {
              select: {
                url: true
              },
              take: 1
            },
          }
        });
        
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: "لقد حدث خطأ ما" });
    }
    
  }
}