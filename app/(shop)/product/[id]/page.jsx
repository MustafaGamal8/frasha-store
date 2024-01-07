"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';
import { FaFacebookF } from "react-icons/fa";
import GetProduct from '../../logic/getProduct';
import Galary from './Galary';
import { toast } from 'react-toastify';
import Link from 'next/link';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const productData = await GetProduct(id);
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    }
    fetchProduct();
  }, [id]);


  const handelFavorite = (id) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(id)) {
      favorites.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      toast.success("تم اضافة المنتج الي المفضلات")
      return
    }
    favorites.splice(favorites.indexOf(id), 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    toast.info("تم ازالة المنتج من المفضلات")
  }

  const handelCart = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(id)) {
      cart.push(id);
      localStorage.setItem('cart', JSON.stringify(cart));
      toast.success("تم اضافة المنتج الي سلة المشتريات")
      return
    }
    cart.splice(cart.indexOf(id), 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.info("تم ازالة المنتج من سلة المشتريات")
  }



  return (
    <>

      {
        !product ?
          <LoadingProductPage />
          :
          (
            <div className="w-11/12 mx-auto flex lg:flex-row flex-col items-center">
              {
                product.photos && product.photos.length <= 1 ?
                  (
                    <div className='lg:w-2/5 w-full flex items-center  justify-center'>
                      <img src={product.photos[0]?.url || '/logo.png'} className='w-full  md:w-[450px] object-cover my-10' alt="" />
                    </div>

                  )
                  :
                  <div className="lg:w-2/5 w-full h-96 mx-auto my-10 ">
                    <Galary photos={product.photos} />
                  </div>
              }



              <div className="lg:w-1/2 w-full mx-auto my-10 px-4 select-text">
                <h1 className="text-4xl font-semibold mb-2">{product.name}</h1>
                <p className="text-3xl font-semibold text-primary mb-4">{product.price}$</p>
                <p className="text-secondary mb-4 text-xl ">{product.description}</p>



                <section className="flex flex-col-reverse items-center justify-center gap-5">


                  {
                    product.link &&

                    <Link href={product?.link} target='_blank' className="flex items-center justify-center w-[300px] bg-blue-500 hover:bg-blue-600 text-white md:px-4 md:py-2  p-2 rounded-md mr-4 transition-all duration-300">
                      <FaFacebookF className="mr-2" />
                      مشاهدة المنتج عل الفيسبوك
                    </Link>
                  }

                  <div className="flex items-center justify-center gap-5">
                    <button onClick={() => handelCart(product.id)} className="flex items-center bg-green-400 hover:bg-green-500 text-white md:px-4 md:py-2  p-2 rounded-md mr-4 transition-all duration-300">
                      <AiOutlineShoppingCart className="mr-2" />
                      اضافة الي سلة المشتريات
                    </button>
                    <button onClick={() => handelFavorite(product.id)} className="flex items-center border border-primary text-primary hover:bg-primary hover:text-white md:px-4 md:py-2 p-2 rounded-md transition-all duration-300 ">
                      <AiOutlineHeart className="mr-2" />
                      اضافة للمفضلة
                    </button>
                  </div>

                </section>

              </div>
            </div>
          )
      }
    </>

  );
};

export default ProductDetail;


function LoadingProductPage() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 4000);
  return (
    <>
      {
        loading ?

          <div className='flex flex-col lg:flex-row items-center justify-center w-full h-full  gap-10'>

            <div className='lg:w-[40%] w-[80%] h-[500px] bg-slate-300 animate-pulse'></div>

            <div className='flex flex-col '>
              <div className='md:w-[500px] w-[250px] h-10 bg-slate-500 animate-pulse'></div>
              <div className='lg:w-[300px] w-[150px] ms-auto mt-5 h-10 bg-slate-500 animate-pulse'></div>
            </div>
          </div>
          :
          <h1 className='text-center  text-4xl text-primary'>لم يتم العثور على المنتج</h1>
      }
    </>
  )
}
