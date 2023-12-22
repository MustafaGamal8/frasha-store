"use client";
import Image from 'next/image';
import { useState } from 'react';
import { BsCart3 } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";



const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
    <nav className='w-full h-16 flex items-center justify-between gap-4 p-4 drop-shadow bg-white'>

      <section >
        <Image
          src='/logo.png'
          alt='logo'
          width={100}
          height={100}
        />
      </section>

      <section className='hidden md:flex flex-row-reverse items-center gap-3 text-gray-700'>
        <h1 className='relative after:absolute hover:after:-translate-y-1 after:top-0 after:left-0 hover:after:w-full after:h-1 after:rounded after:bg-primary after:transition-all after:duration-00 cursor-pointer text-lg'>الرئيسية</h1>
        <h1 className='relative after:absolute hover:after:-translate-y-1 after:top-0 after:left-0 hover:after:w-full after:h-1 after:rounded after:bg-primary after:transition-all after:duration-00 cursor-pointer text-lg'>من نحن</h1>
        <h1 className='relative after:absolute hover:after:-translate-y-1 after:top-0 after:left-0 hover:after:w-full after:h-1 after:rounded after:bg-primary after:transition-all after:duration-00 cursor-pointer text-lg'>المنتجات</h1>
        <h1 className='relative after:absolute hover:after:-translate-y-1 after:top-0 after:left-0 hover:after:w-full after:h-1 after:rounded after:bg-primary after:transition-all after:duration-00 cursor-pointer text-lg'>تواصل معنا</h1>     
      </section>

      <section className='hidden md:flex  items-center gap-2 '>
        <div className='flex items-center gap-1 text-primary   cursor-pointer hover:bg-primary hover:text-white p-1 rounded transition-all'>
        <BsCart3  />
          <h1 className='text-sm '>سلة المشتريات</h1>
        </div>

        <div className='flex items-center gap-1 bg-primary text-white p-1 rounded cursor-pointer'>
        <CiUser />
          <h1 className='text-sm '>تسجيل الدخول</h1>
        </div>
      </section>

      <div className='md:hidden cursor-pointer hover:-translate-x-1 transition-all' onClick={() => setIsMenuOpen(true)}>
      <CiMenuFries />
      </div>
    </nav>
    
    
    {
        isMenuOpen && (
        <section className='fixed top-0 left-0 h-screen w-full bg-white flex flex-col items-center justify-center gap-3 z-[99]' >
        <RxCross2 onClick={() => setIsMenuOpen(false)}  className='cursor-pointer text-3xl mb-10'/>
          <h1 className='relative after:absolute hover:after:-translate-y-1 after:top-0 after:left-0 hover:after:w-full after:h-1 after:rounded after:bg-primary after:transition-all after:duration-00 cursor-pointer text-2xl'>الرئيسية</h1>
          <h1 className='relative after:absolute hover:after:-translate-y-1 after:top-0 after:left-0 hover:after:w-full after:h-1 after:rounded after:bg-primary after:transition-all after:duration-00 cursor-pointer text-2xl'>من نحن</h1>
          <h1 className='relative after:absolute hover:after:-translate-y-1 after:top-0 after:left-0 hover:after:w-full after:h-1 after:rounded after:bg-primary after:transition-all after:duration-00 cursor-pointer text-2xl'>المنتجات</h1>
          <h1 className='relative after:absolute hover:after:-translate-y-1 after:top-0 after:left-0 hover:after:w-full after:h-1 after:rounded after:bg-primary after:transition-all after:duration-00 cursor-pointer text-2xl'>تواصل معنا</h1>     
        </section>)
      }


    </>
  );
}

export default NavBar;
