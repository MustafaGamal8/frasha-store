
import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {
  if (req.method == "GET") {
    try {
      const prisma = new PrismaClient();
      const { imgId } = req.query;
      const image = await prisma.photo.findUnique({
        where: {
          id: imgId,
        },
      });
      if (!image ) {
        return res.status(404).json({ error: "الصورة غير موجودة" });        
      }
      // res.setHeader('Content-Type', 'image/*');

      const buffer = image.photo; // Assuming 'photo' contains the image buffer
      const dataUrl = `data:image/jpeg;base64,${Buffer.from(buffer).toString('base64')}`;

      res.status(200).json(dataUrl);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "لقد حدث خطأ ما" });      
    }
  }
}