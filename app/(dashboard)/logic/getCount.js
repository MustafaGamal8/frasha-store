"use server"
import { PrismaClient } from "@prisma/client"
export const  GetProductsCount = async () => {
  try {
    const prisma = new PrismaClient()
    const products = await prisma.product.count()
    return products
    
  } catch (error) {
    console.log(error)    
  }
  
}

export const  GetCategoriesCount = async () => {
  try {
    const prisma = new PrismaClient()
    const categories = await prisma.category.count()
    return categories
    
  } catch (error) {
    console.log(error)    
  }
}



export const  GetOrdersCount = async () => {
  try {
    const prisma = new PrismaClient()
    const orders = await prisma.order.count()
    return orders
    
  } catch (error) {
    console.log(error)    
  }
}