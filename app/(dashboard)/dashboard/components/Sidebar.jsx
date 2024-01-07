"use client";
import { useState } from 'react';
import { HiOutlineHome, HiOutlineShoppingBag, HiOutlineCube, HiOutlineUser } from 'react-icons/hi2';
import { AiOutlineBars } from "react-icons/ai";
import { FiLogOut } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

const Sidebar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const router = useRouter();

  const handleHover = (item) => {
    setHoveredItem(item);
  };

  const resetHover = () => {
    setHoveredItem(null);
  };

  const sidebarItems = [
    { text: 'لوحة التحكم', icon: <HiOutlineHome />, link: '/dashboard' },
    { text: 'المنتجات', icon: <HiOutlineCube />, link: '/dashboard/products' },
    { text: 'الأقسام', icon: <AiOutlineBars />, link: '/dashboard/categories' },
    { text: 'الطلبات', icon: <HiOutlineShoppingBag />, link: '/dashboard/orders' },
    { text: 'المستخدمين', icon: <HiOutlineUser />, link: '/dashboard/admins' },
  ];


  


  const logoutHandler = () => {
    deleteCookie("token");
    router.replace("/");
    setTimeout(() => {
      router.refresh();
    }, 1000);
  }

  return (
    <aside className="fixed right-0 top-0 bg-white md:w-[100px] w-full md:h-full flex md:flex-col justify-between items-center md:pb-5 drop-shadow-md">
      <section>
        <Link href="/" >
          <Image className='w-[80px] h-[80px] object-contain' src={'/logo.png'} width={150} height={150} alt="Logo" />
        </Link>
      </section>

      <ul className='flex md:flex-col md:gap-5 gap-1'>
        {sidebarItems.map((item, index) => (
          <li
            key={index}
            className={`flex items-center justify-center h-12 w-12 rounded-lg relative`}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={resetHover}
          >
            <Link href={item.link} className="flex items-center justify-center w-full h-full  md:text-2xl text-xl">
              <span className='relative'>
                {item.icon}
                {hoveredItem === index && (
                  <span className="mr-2 bg-primary text-white text-xs px-2 py-1 rounded absolute top-[-12] left-[50%] transform -translate-x-1/2 whitespace-nowrap">
                    {item.text}
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="md:mt-4 mx-1">
        <button onClick={logoutHandler}  className="flex items-center justify-center md:w-12 w-10 md:h-12 h-10 rounded-lg bg-secondary text-white hover:bg-primary">
          <FiLogOut />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
