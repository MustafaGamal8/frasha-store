import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  if (req.method == "GET") {
    return getOrders(req, res);
  } else if (req.method == "POST") {
    return createOrder(req, res);
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}

const getOrders = async (req, res) => {
  const prisma = new PrismaClient();
  const orders = await prisma.order.findMany()
  res.status(200).json(orders)
}

const createOrder = async (req, res) => {
  const prisma = new PrismaClient();
  const { name, phone, totalPrice, productsIds } = req.body
   await prisma.order.create({
    data: {
      name,
      phone,
      totalPrice,
      productsIds
    }
  })
  res.status(200).json({message : 'تم اضافة الطلب بنجاح' })
}