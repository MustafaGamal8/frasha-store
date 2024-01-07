import CheckAuth from '@/services/CheckAuth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const isAdmin = await CheckAuth(req, res);
      isAdmin && await postCategory(req, res);    
    } catch (error) {
      return res.status(500).json({ error: "حدث خطأ أثناء معالجة الطلب" });
    }
  } else if (req.method === "PUT") {
    try {
      const isAdmin = await CheckAuth(req, res);
      isAdmin && await updateCategory(req, res);    
    } catch (error) {
      return res.status(500).json({ error: "حدث خطأ أثناء معالجة الطلب" });
    }
  } else {
    return res.status(405).json({ error: 'الطريقة غير مسموح بها' });
  }
}

async function postCategory(req, res) {
  try {
    const { categoryName } = req.body;
    await prisma.category.create({
      data: {
        name: categoryName
      }
    });
    res.status(200).json({ message: "تم إضافة القسم بنجاح" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "لقد حدث خطأ أثناء إضافة القسم" });
  }
}

async function updateCategory(req, res) {
  try {
    const { categoryId, categoryName } = req.body;

    if (!categoryId || !categoryName) {
      return res.status(500).json({ error: "يرجى تحديد القسم" });
    }
    if (!categoryId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(500).json({ error: "يرجى تحديد القسم بشكل صحيح" });      
    }

    await prisma.category.update({
      where: {
        id: categoryId
      },
      data: {
        name: categoryName
      }
    });
    res.status(200).json({ message: "تم تعديل القسم بنجاح" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "لقد حدث خطأ أثناء تحديث القسم" });    
  }
}
