"use client"
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function CategoriesSection({ currentCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    }
    fetchCategories();
  },[])


  return (
    <section className='w-[80%] mx-auto overflow-x-auto flex flex-row-reverse items-center whitespace-nowrap '>


      <h1 className="text-xl ">:الأقسام</h1>
      {categories.length == 0 ?
        <div className="w-[500px] h-10 bg-slate-300 animate-pulse ms-auto my-5"></div>
        : <>
          <ul className="w-full  flex flex-row-reverse gap-6 my-10 p-1 mx-5">
            <Link href={`/products`} ><li className={`category-item ${currentCategory == 'الكل' ? 'active' : ''}`}>الكل</li></Link>
            {categories.map((category, index) => (
              <Link href={`/products?categoryId=${category.id}`} key={index} className="category-item">
                <li key={index} className={`category-item  ${currentCategory === category.id ? 'active' : ''}`}>
                  {category.name}
                </li>
              </Link>
            ))}
          </ul>
        </>}


    </section>
  )
}
