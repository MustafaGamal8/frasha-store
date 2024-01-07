import CheckAuth from "@/services/CheckAuth";
import { PrismaClient } from "@prisma/client";
import Jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    await getProducts(req, res);
  } else if (req.method === "DELETE") {
    const isAdmin = await CheckAuth(req, res);
    isAdmin &&  await deleteProducts(req, res);
  } else {
    return res.status(405).json({ message: "الطريقة غير مسموح بها" });
  }
}

async function getProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const categoryId = req.query.categoryId || "الكل";
    const take = 10;
    const skip = (page - 1) * take;
    let where = {};

    if (categoryId !== "الكل") {
      where = { categoryId: categoryId };
    }

    const products = await prisma.product.findMany({
      skip,
      take,
      orderBy: {
        createdAt: 'desc'
      },
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
      where,
    });

    const productsCount = await prisma.product.count({
      where,
    });

    return res.status(200).json({ products, productsCount });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "لقد حدث خطأ ما" });
  }
}

async function deleteProducts(req, res) {
  try {
    const { productsIds } = req.body;

    await Promise.all(productsIds.map(async (productId) => {
      await prisma.product.delete({
        where: {
          id: productId
        }
      });
    }));

    return res.status(200).json({ message: "تم الحذف بنجاح" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "لقد حدث خطأ ما" });
  }
}
