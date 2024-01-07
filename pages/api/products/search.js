import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const search = req.query.search;
    const prisma = new PrismaClient();
    try {
      const products = await prisma.product.findMany({
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
          }
        },
        where: {
          name: {
            contains: search
          }
        }
      });
      await prisma.$disconnect(); // Disconnect from the Prisma client after the operation
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      await prisma.$disconnect(); // Disconnect from the Prisma client in case of an error
      return res.status(500).json({ error: "حدث خطأ أثناء البحث عن المنتجات" });
    }
  }
}
