"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductsSection from '../components/ProductsSection';
import { FaHeart } from 'react-icons/fa';


export default function page() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    const productsIds = JSON.parse(localStorage.getItem('favorites'))

    async function fetchCart() {
      const response = await axios.post('/api/products/list', {
        productsIds: productsIds
      })
      setCart(response.data)
    }

    fetchCart()
  }, [])



  return (
    <div className='mb-28'>
      <div className='flex justify-center items-center  m-auto w-1/2 text-center text-3xl font-bold  text-secondary  my-10 gap-2'>
      <FaHeart />
        <h1 > المفضلة </h1>
      </div>
      <ProductsSection products={cart} />


    </div>
  )
}
