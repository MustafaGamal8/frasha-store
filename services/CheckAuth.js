
import { PrismaClient } from "@prisma/client";
import Jwt from "jsonwebtoken";

export default async function CheckAuth(req, res) {
  try {
    const prisma = new PrismaClient();
    let token = req.headers["authorization"];
    token = token ? token.replace("Bearer ", "") : "";
    const decodedToken = Jwt.decode(token);
    if (!decodedToken) {
      res.status(401).json({ error: 'الرجاء تسجيل الدخول' });
      return false
    }

    const admin = await prisma.admin.findUnique({
      where: {
        id: decodedToken.userId
      }
    })

    if (!admin) {
      res.status(401).json({ error: 'الرجاء تسجيل الدخول' });
      return false
    }

    return true
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'فشل التوثيق' });
    return false;
  }
}
