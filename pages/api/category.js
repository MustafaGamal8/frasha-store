
import { PrismaClient } from '@prisma/client';
import  Jwt  from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const prisma = new PrismaClient()

      let token = req.headers["authorization"];
      token = token ? token.replace("Bearer ", "") : "";
      const decodedToken = Jwt.decode(token);

      if (!decodedToken) {
        return res.status(401).json({ error: 'الرجاء تسجيل الدخول' });
      }

      const admin = await prisma.admin.findUnique({
        where: {
          id: decodedToken.userId
        }
      })

      if (!admin) {
        return res.status(401).json({ error: 'الرجاء تسجيل الدخول' });
      }

      const { categoryName } = req.body
      await prisma.category.create({
        data: {
          name : categoryName
        }
      })
      res.status(200).json({ message: "تم اضافة القسم بنجاح" });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: "لقد حدث خطأ ما" });
    }
  }
}