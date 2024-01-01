"use client"
import  Link  from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default  function CategoriesSection({ currentCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    }
    fetchCategories();
  })


  return (
    <ul className="w-full md:w-[80%] flex flex-wrap flex-row-reverse gap-6 my-10 p-1">
        <h1 className="text-xl ">:الأقسام</h1>
        {categories.length == 0 ?
          <div className="w-[500px] h-10 bg-slate-300 animate-pulse ms-auto"></div> 
          :<>
          <Link href={`/products`} ><li className={`category-item ${currentCategory == 'الكل' ? 'active' : ''}`}>الكل</li></Link>
          {categories.map((category, index) => (
            <Link href={`/products?category=${category.name}`} key={index} className="category-item">
              <li key={index} className={`category-item  ${currentCategory === category.name ? 'active' : ''}`}>
                {category.name}
              </li>
            </Link>
          ))}
        </>}
      </ul>
  )
}
