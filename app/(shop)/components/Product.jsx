"use client";
import { FiShoppingCart, FiHeart, FiLink } from 'react-icons/fi';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Product = ({ product }) => {
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const { id, name, price, photos, link } = product;

  useEffect(() => {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      setFavorites(favorites);

      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCart(cart);
  }, [])

  const handelFavorite = (id) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(id)) {
    favorites.push(id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setFavorites(favorites);
    toast.success("تم اضافة المنتج الي المفضلات")
    return
    }
    favorites.splice(favorites.indexOf(id), 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    setFavorites(favorites);

  } 

  const handelCart = (id) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart.includes(id)) {
    cart.push(id);
    localStorage.setItem('cart', JSON.stringify(cart));
    setCart(cart);
    toast.success("تم اضافة المنتج الي سلة المشتريات")
    return
    }
    cart.splice(cart.indexOf(id), 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    setCart(cart);
  }


  return (
    <div  className={`w-full h-full  drop-shadow-lg rounded-lg`}>
      <section className="group relative  bg-[#f6f6f6] w-full h-[350px] cursor-pointer flex items-center justify-center">
        <Link id='product_image' href={`/product/${id}`} className='w-full h-full ' >
          <img className="w-full h-full "  src={ photos[0] ? photos[0].url : '/logo.png'} alt="صورة المنتج" />
        </Link>


        <div className="group group-hover:h-[80px] h-[55px] md:h-0 w-full group-hover:flex absolute bottom-0 left-0 bg-gray-400 bg-opacity-50 z-[1] transition-all duration-300">
          <div className="md:hidden flex group-hover:flex items-center justify-around h-full w-full p-2">
            
            <div onClick={() => handelCart(id)} className={`text-2xl cursor-pointer icon-outline ${cart.includes(id) ? 'text-green-500' : 'text-white'}`}>
              <FiShoppingCart />
            </div>
            {
              link && (
                <Link target='_blank' href={link || '/'} className="text-2xl text-white cursor-pointer icon-outline">
                  <FiLink />
                </Link>
              )
            }
            <div onClick={() => handelFavorite(id)}  className={`text-2xl  cursor-pointer icon-outline ${favorites.includes(id) ? 'text-red-500' : 'text-white'} `}>
              <FiHeart />
            </div>

          </div>
        </div>
      </section>

      <section className="text-center text-2xl pt-2 bg-primary text-white">
        <h1 className='text-2xl'>{name}</h1>
        <h2 className='text-xl'>{price} $</h2>
      </section>
    </div>
  );
};

export default Product;
