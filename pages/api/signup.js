import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    throw new Error('حدث خطأ أثناء تشفير كلمة المرور');
  }
};

const createUser = async (username, hashedPassword) => {
  try {
    return await prisma.admin.create({
      data: {
        username: username,
        password: hashedPassword
      }
    });
  } catch (error) {
    throw new Error('حدث خطأ أثناء إنشاء المستخدم');
  }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'يرجى إدخال جميع البيانات' });
    }

    try {
      const existingUser = await prisma.admin.findFirst({
        where: {
          username: username
        }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'اسم المستخدم موجود مسبقاً' });
      }

      const hashedPassword = await hashPassword(password);
      await createUser(username, hashedPassword);

      res.status(200).json({ message: 'تم إنشاء الحساب بنجاح' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'الطريقة غير مسموح بها' });
  }
}
