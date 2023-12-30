"use client"
import { useState } from "react";
import { IoAdd, IoCartOutline, IoFolderOpenOutline, IoListOutline, IoAddCircle } from "react-icons/io5";
import Link from 'next/link';
import AddProductModal from "./components/AddProductModal";
import AddCategoryModal from "./components/AddCategoryModal";






const items = [
  {
    title: 'المُنتجات',
    number: '250',
    icon: <IoCartOutline />,
    to: '/dashboard/products',
  },
  {
    title: 'الأقسام',
    number: '150',
    icon: <IoFolderOpenOutline />,
    to: '/dashboard/categories',
  },
  {
    title: 'الطلبات',
    number: '200',
    icon: <IoListOutline />,
    to: '/dashboard/orders',
  },
];
const Dashboard = () => {
  const [isModalsOpen, setIsModalsOpen] = useState({
    isProductModalOpen: false,
    isCategoryModalOpen: false
  });

  const openModal = (modalName) => {
    modalName == "product" ? setIsModalsOpen({ isProductModalOpen: true }) : setIsModalsOpen({ isCategoryModalOpen: true });
  };

  const closeModal = (modalName) => {
    modalName == "product" ? setIsModalsOpen({ isProductModalOpen: false }) : setIsModalsOpen({ isCategoryModalOpen: false });
  };


  return (
    <>
      <div className="w-full h-[160px] bg-secondary flex justify-center items-center" > <h1 className="text-white text-3xl font-bold">لوحة التحكم</h1> </div>

      <section className=" flex flex-wrap gap-5 p-5 items-center justify-center w-full">
        {items.map((item, index) => (
          <Link href={item.to} key={index}>
            <div className="relative group bg-white p-5 rounded w-[250px] shadow-md overflow-hidden">
              <span className="absolute rounded-tr-full bg-secondary -bottom-10 -left-10 w-20 h-20 group-hover:w-full group-hover:h-full group-hover:rounded-none group-hover:bottom-0 group-hover:left-0 transition-all duration-500 "></span>
              <div className="flex items-center justify-between">
                <div className="bg-secondary rounded-full p-2 text-white text-xl group-hover:bg-white group-hover:text-secondary transition-all">
                  {item.icon}
                </div>
                <h1 className="text-2xl font-bold text-gray-800 group-hover:text-white transition-all">
                  {item.title}
                </h1>
              </div>
              <div className="flex items-center justify-end ">
                <h1 className="text-4xl font-bold   mt-4 text-primary group-hover:text-white ">
                  {item.number}
                </h1>
              </div>
            </div>
          </Link>
        ))}
      </section>


      <div onClick={() => openModal("product")} className="w-[250px] h-[50px] bg-secondary flex justify-center items-center gap-2 text-white cursor-pointer rounded ">
        <div className="text-secondary rounded-full p-1 bg-white text-xl group-hover:bg-white group-hover:text-secondary transition-all">
          <IoAdd />
        </div>
        <h1>اضافة منتج</h1>
      </div>

      <div onClick={() => openModal("category")} className="w-[250px] h-[50px] bg-secondary flex justify-center items-center gap-2 text-white cursor-pointer rounded ">
        <div className="text-secondary rounded-full p-1 bg-white text-xl group-hover:bg-white group-hover:text-secondary transition-all">
          <IoAdd />
        </div>
        <h1>اضافة قسم</h1>
      </div>



      <AddProductModal isOpen={isModalsOpen.isProductModalOpen} onClose={() => closeModal("product")} />
      <AddCategoryModal isOpen={isModalsOpen.isCategoryModalOpen} onClose={() => closeModal("category")} />
    </>
  );
};

export default Dashboard;