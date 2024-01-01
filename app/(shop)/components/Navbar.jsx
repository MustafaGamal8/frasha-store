"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BsCart3, BsHeart } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { CiMenuFries } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import LoginModal from './LoginModal';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { useRouter, usePathname } from 'next/navigation';



export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getCookie("token") ? setIsAdmin(true) : setIsAdmin(false);
  }, [isModalOpen])

  const handelLoginClick = () => {
    isAdmin ? router.push("/dashboard") : openModal();
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  }
  const openModal = () => {
    setIsModalOpen(true);
    closeMenu()
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>

      <nav className='w-full h-16 flex items-center justify-between gap-4 p-4 drop-shadow bg-white select-none'>

        <section >
          <Link href='/'>
            <Image
              src='/logo.png'
              alt='logo'
              width={100}
              height={100}
            />
          </Link>
        </section>

        <section className='hidden md:flex flex-row-reverse items-center gap-3 whitespace-nowrap'>
          <Link href='/' className='relative after:absolute hover:after:-translate-y-1 after:top-0 after:left-0 hover:after:w-full after:h-1 after:rounded after:bg-primary after:transition-all after:duration-00 cursor-pointer text-lg'>الرئيسية</Link>
          <Link href='/about' className='relative after:absolute hover:after:-translate-y-1 after:top-0 after:left-0 hover:after:w-full after:h-1 after:rounded after:bg-primary after:transition-all after:duration-00 cursor-pointer text-lg'>من نحن</Link>
          <Link href='/products' className='relative after:absolute hover:after:-translate-y-1 after:top-0 after:left-0 hover:after:w-full after:h-1 after:rounded after:bg-primary after:transition-all after:duration-00 cursor-pointer text-lg'>المنتجات</Link>
          <Link href='/#footer' className='relative after:absolute hover:after:-translate-y-1 after:top-0 after:left-0 hover:after:w-full after:h-1 after:rounded after:bg-primary after:transition-all after:duration-00 cursor-pointer text-lg'>تواصل معنا</Link>
        </section>

        <section className='hidden md:flex  items-center gap-2  whitespace-nowrap'>
          <Link href={'/cart'} className='flex items-center gap-1 text-primary   cursor-pointer hover:bg-primary hover:text-white p-1 rounded transition-all'>
            <BsCart3 />
            <h1 className='text-sm '>سلة المشتريات</h1>
          </Link>
          <Link href={'/favorites'} className='flex items-center gap-1 text-primary   cursor-pointer hover:bg-primary hover:text-white p-1 rounded transition-all'>
            <BsHeart />
            <h1 className='text-sm '>المفضلة </h1>
          </Link>

          <div onClick={handelLoginClick} className='flex items-center gap-1 bg-primary text-white p-1 rounded cursor-pointer'>
            <CiUser />
            {
              isAdmin ? <h1 className='text-sm '>الدخول </h1> : <h1 className='text-sm '>تسجيل الدخول</h1>
            }
          </div>
        </section>

        <div className='md:hidden cursor-pointer hover:-translate-x-1 transition-all' onClick={() => setIsMenuOpen(true)}>
          <CiMenuFries />
        </div>
      </nav>


      <>
        {
          isMenuOpen && (
            <section className='fixed top-0 left-0 h-screen w-full bg-white flex flex-col items-center justify-center gap-3 z-[100] ' >
              <RxCross2 onClick={closeMenu} className='cursor-pointer text-3xl mb-10' />
              <Link onClick={closeMenu} href='/' className='relative after:absolute hover:after:-translate-y-1 after:top-0 after:left-0 hover:after:w-full after:h-1 after:rounded after:bg-primary after:transition-all after:duration-00 cursor-pointer text-2xl'>الرئيسية</Link>
              <Link onClick={closeMenu} href='/about' className='relative after:absolute hover:after:-translate-y-1 after:top-0 after:left-0 hover:after:w-full after:h-1 after:rounded after:bg-primary after:transition-all after:duration-00 cursor-pointer text-2xl'>من نحن</Link>
              <Link onClick={closeMenu} href='/products' className='relative after:absolute hover:after:-translate-y-1 after:top-0 after:left-0 hover:after:w-full after:h-1 after:rounded after:bg-primary after:transition-all after:duration-00 cursor-pointer text-2xl'>المنتجات</Link>
              <Link onClick={closeMenu} href='/#footer' className='relative after:absolute hover:after:-translate-y-1 after:top-0 after:left-0 hover:after:w-full after:h-1 after:rounded after:bg-primary after:transition-all after:duration-00 cursor-pointer text-2xl'>تواصل معنا</Link>

              <section className='flex  flex-col items-center gap-2  '>
                <Link onClick={closeMenu} href={'/favorites'} className='flex items-center gap-1 text-primary   cursor-pointer hover:bg-primary hover:text-white p-1 rounded transition-all'>
                  <BsHeart />
                  <h1 className='text-xl'>المفضلة </h1>
                </Link>

                <Link onClick={closeMenu} href={'/cart'} className='flex items-center gap-1 text-primary   cursor-pointer hover:bg-primary hover:text-white p-1 rounded transition-all'>
                  <BsCart3 />
                  <h1 className='text-xl'>سلة المشتريات</h1>
                </Link>


                <div onClick={openModal} className='flex items-center gap-1 bg-primary text-white p-1 rounded cursor-pointer' >
                  <CiUser />
                  <h1 className='text-xl'>{isAdmin ? 'الدخول' : 'تسجيل الدخول'}</h1>
                </div>
              </section>
            </section>
          )
        }
      </>


      <LoginModal isOpen={isModalOpen} onClose={closeModal} />


    </>
  );
}

