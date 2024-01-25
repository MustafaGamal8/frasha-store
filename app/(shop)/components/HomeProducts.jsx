"use client";
import Link from 'next/link';
import ProductsSection from './ProductsSection';
import CategoriesSection from './CategoriesSection';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function HomeProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const res = await axios.get('/api/products')
        setProducts(res.data.products)
      } catch (error) {
        toast.error(error.response.data.error || 'حدث خطأ ما')
        console.log(error)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  return (
    <section className="w-full m-auto my-28 ">
      <CategoriesSection currentCategory="الكل" />

      <ProductsSection products={products} isloading={loading} />

      <Link
        href={'/products'}
        className="w-[150px] block rounded-lg p-4 bg-primary hover:bg-secondary text-white text-xl m-auto text-center cursor-pointer transition-all "
      >
        عرض الكل
      </Link>
    </section>
  );
}
