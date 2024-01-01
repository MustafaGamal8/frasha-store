"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductsSection from '../components/ProductsSection';
import { FaHeart } from 'react-icons/fa';
import GetList from '../logic/getList';


export default function page() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const productsIds = JSON.parse(localStorage.getItem('favorites'))

    async function fetchFavorites() {
      const products = await GetList(productsIds)
      setFavorites(products)    
    }

    fetchFavorites()
  }, [])


  



  return (
    <div className='mb-28'>
      <div className='flex justify-center items-center  m-auto w-1/2 text-center text-3xl font-bold  text-secondary  my-10 gap-2'>
      <FaHeart />
        <h1 > المفضلة </h1>
      </div>
      <ProductsSection products={favorites} />


    </div>
  )
}



