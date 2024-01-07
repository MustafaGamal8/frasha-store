import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // التحقق
    if (!username || !password) {
      return res.status(400).json({ message: 'يرجى إدخال جميع البيانات' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'يجب أن تكون كلمة المرور أكبر من 6 أحرف' });
    }

    const user = await prisma.admin.findFirst({
      where: {
        username: username
      }
    })

    if (!user) {
      return res.status(400).json({ message: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: 'اسم المستخدم أو كلمة المرور غير صحيحة' });     
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
    res.status(405).json({ error: 'الطريقة غير مسموح بها' });
  }
}
