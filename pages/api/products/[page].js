

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(req, res) {
  
  if (req.method == "GET") {
    const page = parseInt(req.query.page) || 1;
    const category = req.query.category;
    let categoryId =   category != 'الكل' ?  await prisma.category.findFirst({ where: { name: category }, select: { id: true } }) : "الكل"
    if (!categoryId && category != 'الكل') {
      return res.status(500).json({ error: "القسم غير موجود" });
    }
    
    try {
      const products = await getProducts(page, categoryId.id);
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: "لقد حدث خطأ ما" });
    }
    
  }else{
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}


async  function getProducts(page, categoryId) {
  if (categoryId == 'الكل') {
   return await prisma.product.findMany({
    skip: (page - 1) * 10,
    take: 10,
    select: {
      id: true,
      name: true,
      price: true,
      categoryId: true,
      photos: {
        select: {
          url: true
        },
        take: 1
      },
    },
  })
  }else{
    return await  prisma.product.findMany({
      skip: (page - 1) * 10,
      take: 10,
      select: {
        id: true,
        name: true,
        price: true,
        categoryId: true,
        photos: {
          select: {
            url: true
          },
          take: 1
        },
      },
      where: {
        categoryId:categoryId
      }
    })
  }
  
}