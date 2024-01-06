import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    const page = parseInt(req.query.page) || 1;
    const category = req.query.category || "الكل";
    try {
      const { products, productsCount } = await getProducts(page, category);
      return res.status(200).json({ products, productsCount });
    } catch (error) {
      return res.status(500).json({ error: "An error occurred" });
    }
  }

  else if (req.method === "DELETE") {
    try {

      const { productsIds } = req.body;
      const { message } = await deleteProducts(productsIds);
      res.status(200).json({ message });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: "لقد حدث خطأ ما" });
    }
  }
  else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}

async function getProducts(page, category) {
  const take = 10;
  const skip = (page - 1) * take;
  let where = {};

  if (category !== "الكل") {
    const categoryData = await prisma.category.findFirst({
      where: { name: category },
      select: { id: true },
    });
    if (!categoryData) throw new Error("Category not found");
    where = { categoryId: categoryData.id };
  }

  const products = await prisma.product.findMany({
    skip,
    take,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        }
      },
      photos: {
        select: {
          url: true,
          id: true
        },
      },
    },
    where,
  });

  const productsCount = await prisma.product.count({
    where,
  });

  return { products, productsCount };
}



async function deleteProducts(productsIds) {

   productsIds.forEach(async (productId) => {
    await prisma.product.delete({
      where: {
        id: productId
      }
    });
  });
  
  return { message: 'تم الحذف بنجاح' }
}