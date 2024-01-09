import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const search = req.query.search;
    const prisma = new PrismaClient();
    try {
      const products = await prisma.product.findMany({
        include: {
          category: {
            select: {
              id: true,
              name: true,
            }
          },
          photos: {
            select: {
              url: true,
              id: true
            },
          },
        },
        where: {
          name: {
            contains: search
          }
        }
      });

      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "حدث خطأ أثناء البحث عن المنتجات" });
    }
  }
}
