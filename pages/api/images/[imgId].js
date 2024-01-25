import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const prisma = new PrismaClient();
      const { imgId } = req.query;
      const image = await prisma.photo.findUnique({
        where: {
          id: imgId,
        },
      });

      if (!image) {
        return res.status(404).json({ error: 'الصورة غير موجودة' });
      }

      const imageData = image.photo; 

      if (!imageData) {
        return res.status(404).json({ error: 'بيانات الصورة غير موجودة' });
      }

      res.setHeader('Content-Type', image.type);
      res.status(200).send(imageData);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'لقد حدث خطأ ما' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
