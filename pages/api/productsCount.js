import { PrismaClient } from "@prisma/client";



export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method == "GET") {
    try {
      const category = req.query.category || "الكل";
      
      if (category == "الكل") {
        const products = await prisma.product.count();
      return res.status(200).json(products);        
      }else{
        const categoryId = await prisma.category.findFirst({ where: { name: category }, select: { id: true } });;
        if (!categoryId) {
          return res.status(404).json({ error: "القسم غير موجود" });
        } 
        const products = await prisma.product.count({ where: { categoryId: categoryId.id } });
        return res.status(200).json(products);
      }
      
    } catch (error) {
      return res.status(500).json({ error: "لقد حدث خطأ ما" });
    }

  }else{
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
