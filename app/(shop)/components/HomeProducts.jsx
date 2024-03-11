"use client"
import Link from 'next/link';
import CategoriesSection from './CategoriesSection';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProductsByCategorySection from './ProductsByCategorySection';

export default function HomeProducts() {
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get('/api/categories-with-products');
        setCategories( shuffleArray(res.data).slice(0, 4));
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch categories');
      }
    }

    fetchCategories();
  }, []);

  // Function to shuffle array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <section className="w-full m-auto my-28 ">
      <CategoriesSection currentCategory="الكل" />

      <div className='w-full flex flex-col gap-4 my-10'>
        {categories.map((category, index) => (
          <ProductsByCategorySection key={index} isloading={loading} category={category} />
        ))}
      </div>

      <Link
        href={'/products'}
        className="w-[150px] block rounded-lg p-4 bg-primary hover:bg-secondary text-white text-xl m-auto text-center cursor-pointer transition-all "
      >
        عرض الكل
      </Link>
    </section>
  );
}
