import CheckAuth from "@/services/CheckAuth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const categories = await prisma.category.findMany({
        include: {
          products :{
            include:{
              photos :{
                select:{
                  url:true
                }
              }
            }
          }
        }
      });
      return res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "حدث خطأ أثناء جلب الاقسام" });
    }
  } else {
    return res.status(405).json({ message: 'الطريقة غير مسموح بها' });
  }
}

async function getCategories(req, res) {
    const categories = await prisma.category.findMany({
      include: {
        products: {
          include: {
            photos: true
          }
        }
      }
    });
    return res.status(200).json(categories);
}
