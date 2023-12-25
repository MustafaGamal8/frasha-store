import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  
  if (req.method == "GET") {
    const prisma = new PrismaClient();
    try {
      const categorys = await prisma.category.findMany(
        {
          select: {
            id: true,
            name: true
          }
        }
      );
      return res.status(200).json(categorys);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "لقد حدث خطأ ما" });
    }
    
  }else{
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}