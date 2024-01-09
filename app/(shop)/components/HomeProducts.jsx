import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { toast } from 'react-toastify';
import ProductsSection from './ProductsSection';
import CategoriesSection from './CategoriesSection';



const prisma = new PrismaClient()
const fetchProducts = () => {
  try {
    const response = prisma.product.findMany({
      take: 8,
      select: {
        id: true,
        name: true,
        price: true,
        link: true,
        categoryId: true,
        photos: {
          select: {
            url: true
          },
          take: 1
        }
      }
    });

    return response
  } catch (error) {
    console.log(error)
  }
}

const fetchCategories = () => {
  try {
    const response = prisma.category.findMany({
      select: {
        id: true,
        name: true
      }
    })
    return response

  } catch (error) {
    console.log(error)
  }

}


export default async function HomeProducts() {
  const products = await fetchProducts()
  const categories = await fetchCategories()


  return (
    <section className="w-full m-auto my-28 ">
        <CategoriesSection currentCategory="الكل" categories={categories} />

      <ProductsSection products={products} />
      

      <Link
        href={'/products'}
        className="w-[150px] block rounded-lg p-4 bg-primary hover:bg-secondary text-white text-xl m-auto text-center cursor-pointer transition-all "
      >
        عرض الكل
      </Link>
    </section>
  );
}
