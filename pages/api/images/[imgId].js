
import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {
  if (req.method == "GET") {
    const prisma = new PrismaClient();
    try {
      const { imgId } = req.query;
      const image = await prisma.photo.findUnique({
        where: {
          id: imgId,
        },
      });
      if (!image ) {
        return res.status(404).json({ error: "الصورة غير موجودة" });        
      }
      res.setHeader('Content-Type', "image/*");

      res.status(200).send(image.photo);      
      
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "لقد حدث خطأ ما" });      
    }
  }
}