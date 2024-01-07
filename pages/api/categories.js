import CheckAuth from "@/services/CheckAuth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      return await getCategories(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "حدث خطأ أثناء جلب الاقسام" });
    }
  } else if (req.method === "DELETE") {
    try {
      const isAdmin = await CheckAuth(req, res);
      isAdmin && await deleteCategories(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "حدث خطأ أثناء معالجة الطلب" });
    }
  } else {
    return res.status(405).json({ message: 'الطريقة غير مسموح بها' });
  }
}

async function getCategories(req, res) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "حدث خطأ أثناء جلب الاقسام" });
  }
}

async function deleteCategories(req, res) {
  try {
    const { categoriesIds } = req.body;

    if (!categoriesIds || categoriesIds.length === 0) {
      return res.status(500).json({ error: "يرجى تحديد عنصر واحد على الأقل" });
    }

    await Promise.all(categoriesIds.map(async (categoryId) => {
      await prisma.category.delete({
        where: {
          id: categoryId
        }
      });
    }));

    res.status(200).json({ message: "تم الحذف بنجاح" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "حدث خطأ أثناء محاولة الحذف" });
  }
}
