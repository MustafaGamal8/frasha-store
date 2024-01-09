"use client"
import { useEffect, useState } from 'react';
import ProductsSection from '../components/ProductsSection';
import { BsCart3 } from 'react-icons/bs';
import OrderModal from './OrderModal';
import GetList from '../logic/getList';


export default function page() {
  const [cart, setCart] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const productsIds = JSON.parse(localStorage.getItem('cart'))

    async function fetchCart() {
      setLoading(true)
      const products = await GetList(productsIds)
      setCart(products)
      setLoading(false)
    }

    fetchCart()
  }, [])



  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className='flex justify-center items-center  m-auto md:w-1/2 w-[80%] text-center text-3xl font-bold  text-secondary  my-10 gap-2 '>
        <BsCart3 />
        <h1  >سلة المشتريات </h1>
      </div>
      <ProductsSection isloading={loading} products={cart} />


      {
        cart &&  cart.length > 0 && <div onClick={openModal}  className='text-white bg-green-300 drop-shadow-md p-2 rounded m-auto w-[400px] cursor-pointer text-center font-bold my-10'>اكمال عملية الشراء</div>
      }
      <OrderModal isOpen={isModalOpen} onClose={closeModal}  cart={cart}/>
    </div>
  )
}
