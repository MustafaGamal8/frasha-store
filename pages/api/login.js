import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";
const prisma = new PrismaClient();


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // validition
    if (!username || !password) {
      return res.status(400).json({ message: 'يرجي ادخال جميع البيانات' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'الرقم السري يجب ان يكون اكبر من 6 احرف' });
    }

    const user = await prisma.admin.findFirst({
      where: {
        username: username
      }
    })

    if (!user) {
      return res.status(400).json({ message: 'اسم المستخدم او كلمة المرور غير صحيحة' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: 'اسم المستخدم او كلمة المرور غير صحيحة' });     
    }

    const token = Jwt.sign(
      {
        username: user.username,
        userId: user.id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    )
    
    res.setHeader('authorization', `Bearer ${token}`);
    res.status(200).json({ message: 'تم تسجيل الدخول بنجاح'  });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });

  }
}