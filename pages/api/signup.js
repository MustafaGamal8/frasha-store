import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'يرجي ادخال جميع البيانات' });      
    }
    const user = await prisma.admin.findFirst({
      where: {
        username: username
      }
    })
    if (user) {
      return res.status(400).json({ message: 'اسم المستخدم موجود مسبقا' });      
    }

    const hashedPassword  = await bcrypt.hash(password, 10);
    
    await prisma.admin.create({
      data: {
        username: username,
        password: hashedPassword
      }
    })
    res.status(200).json({ message: 'تم انشاء الحساب بنجاح' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
}
}