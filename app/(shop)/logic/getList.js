"use server"
import { PrismaClient } from "@prisma/client";
export default async function GetList(list) {
  if (!list) {
    return     
  }
  // if thier null or undefined remove it 
  list = list.filter(item => item !== null && item !== undefined)
  try {
    const prisma = new PrismaClient();
    const products = await prisma.product.findMany(
      {
        where: {
          id: {
            in: list
          }
        },
        select: {
          id: true,
          name: true,
          price: true,
          categoryId: true,
          link: true,
          photos: {
            select: {
              url: true
            },
            take: 1
          },
        }
      });
      
    return products  
  } catch (error) {
    return console.log(error)
  }
  
  
}