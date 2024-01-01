"use server"
import { PrismaClient } from "@prisma/client";
export default async function GetProduct(id) {
  if (!id) {
    return
  }
  try {
    const prisma = new PrismaClient();
    const product = await prisma.product.findUnique({
      select: {
        id: true,
        name: true,
        price: true,
        categoryId: true,
        link: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        photos: {
          select: {
            url: true
          },
        }
      },
      where: {
        id: id
      }
    });
    return product
  } catch (error) {
    return console.log(error)
  }
}