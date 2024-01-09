import { PrismaClient } from "@prisma/client";
import { hashPassword } from "./signup";
import CheckAuth from "@/services/CheckAuth";


const prisma = new PrismaClient();
export default async function handler(req, res) {
  if (req.method === "GET") {
    await CheckAuth(req, res);
    await getAdmins(req, res);
  } else if (req.method === "DELETE") {
    await CheckAuth(req, res);
    await deleteAdmin(req, res);
  }else if(req.method === "PUT")
  {
    await CheckAuth(req, res);
    await updateAdmin(req, res);
  }   else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}



const getAdmins = async (req, res) => {
  try {
    const admins = await prisma.admin.findMany();
    res.status(200).json(admins);
  } catch (error) {
    console.error("Error fetching admins:", error);
    res.status(500).json({ error: "حدث خطأ ما" });
  }
}

const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ error: "يجب أدخال رقم المسؤول" });
    }

    const adminsCount = await prisma.admin.count()
    if (adminsCount <= 1) {
      return res.status(400).json({ error: "لا يمكن حذف هذا المسؤول" });
      
    }
    await prisma.admin.delete({ where: { id } });
    res.status(200).json({ message: "تم حذف المسؤول بنجاح" });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ error: "حدث خطأ ما" });
  }
}

const updateAdmin = async (req, res) => {
  try {
    const { id, username, password } = req.body;
    if (!id || !username || !password) {
      return res.status(400).json({ error: "يجب أدخال جميع البيانات" });
    }
    const hashedPassword = await hashPassword(password);
    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data: {
        username: username,
        password: hashedPassword
      },
    });
    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "حدث خطأ ما" });
  }
}