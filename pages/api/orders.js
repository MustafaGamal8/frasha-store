import CheckAuth from "@/services/CheckAuth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    await CheckAuth(req, res);
     await getOrders(req, res);
  } else if (req.method === "POST") {
     await createOrder(req, res);
  }else if (req.method === "DELETE") {
    await CheckAuth(req, res);
     await deleteOrders(req, res);

  }  
  else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}


const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "حدث خطأ ما" });
  }
};

const createOrder = async (req, res) => {
  try {
    const { name, phone, totalPrice, productsIds } = req.body;

    if (!name || !phone || !totalPrice || !productsIds) {
      return res.status(400).json({ error: 'يرجى ملء جميع الحقول' });
    }
    if (phone.length !== 11) {
      return res.status(400).json({ error: 'يرجى ادخال رقم هاتف صحيح' });
      
    }

    await prisma.order.create({
      data: {
        name,
        phone,
        totalPrice,
        productsIds
      }
    });

    res.status(200).json({ message: 'تم اضافة الطلب بنجاح' });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "حدث خطأ ما" });
  }
};

const deleteOrders = async (req, res) => {
  try {
    const {ordersIds} = req.body;
    
    if (!ordersIds) {
      return res.status(400).json({ error: 'يرجى ملء جميع الحقول' });
    }
    
    ordersIds.forEach(async (orderId) => {
      await prisma.order.delete({
        where: {
          id: orderId
        }
      });      
    });
    res.status(200).json({ message: 'تم حذف الطلبات بنجاح' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "حدث خطأ ما" });    
  }
}