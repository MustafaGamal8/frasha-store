"use client"
import { useEffect, useState } from "react";
import { IoAdd, IoCartOutline, IoFolderOpenOutline, IoListOutline } from "react-icons/io5";
import Link from 'next/link';
import AddCategoryModal from "./components/CategoryModal";
import { GetCategoriesCount, GetOrdersCount, GetProductsCount } from "../logic/getCount";
import dashboardSvg from '../assets/dashboard.svg'
import  Image  from 'next/image';
import ProductModal from "./components/ProductModal";
import CategoryModal from "./components/CategoryModal";


const Dashboard = () => {
  const [isModalsOpen, setIsModalsOpen] = useState({
    isProductModalOpen: false,
    isCategoryModalOpen: false
  });
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const openModal = (modalName) => {
    modalName == "product" ? setIsModalsOpen({ isProductModalOpen: true }) : setIsModalsOpen({ isCategoryModalOpen: true });
  };

  const closeModal = (modalName) => {
    modalName == "product" ? setIsModalsOpen({ isProductModalOpen: false }) : setIsModalsOpen({ isCategoryModalOpen: false });
  };

  useEffect(() => {
    (async () => {
      const productsCountPromise = GetProductsCount();
      const categoriesCountPromise = GetCategoriesCount();
      const ordersCountPromise = GetOrdersCount();

      const [productsCountResponse, categoriesCountResponse, ordersCountResponse] = await Promise.all([productsCountPromise, categoriesCountPromise, ordersCountPromise]);
      setLoading(false);
      setProductCount(productsCountResponse);
      setCategoryCount(categoriesCountResponse);
      setOrderCount(ordersCountResponse);
    })()
  }, [])



  const items = [
    {
      title: 'المُنتجات',
      number: productCount,
      icon: <IoCartOutline />,
      to: '/dashboard/products',
    },
    {
      title: 'الأقسام',
      number: categoryCount,
      icon: <IoFolderOpenOutline />,
      to: '/dashboard/categories',
    },
    {
      title: 'الطلبات',
      number: orderCount,
      icon: <IoListOutline />,
      to: '/dashboard/orders',
    },
  ];


  return (
    <>
      <div className="w-full h-[160px] bg-secondary flex justify-center items-center" > <h1 className="text-white text-3xl font-bold">لوحة التحكم</h1> </div>



      {
        loading ?
          <div className="w-full h-full flex flex-col gap-20 items-center mt-5 ">
            <section className="flex gap-3">
              <div className="md:w-[250px] w-[100px] h-16 bg-slate-400 animate-pulse"></div>
              <div className="md:w-[250px] w-[100px] h-16 bg-slate-400 animate-pulse"></div>
              <div className="md:w-[250px] w-[100px] h-16 bg-slate-400 animate-pulse"></div>
            </section>


            <section className="w-[80%] h-[400px] bg-slate-400 animate-pulse"></section>
          </div>
          :

          <>
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




            <section className="flex flex-col items-center justify-around md:flex-row-reverse w-[80%] mx-auto rounded drop-shadow-lg my-10">

              <div className="w-[400px] h-[400px]">
                <Image className="w-full h-full" src={dashboardSvg} alt="" />
              </div>


              <div className="flex flex-col  gap-3">
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

              </div>

            </section>






            {isModalsOpen.isProductModalOpen && <ProductModal isOpen={isModalsOpen.isProductModalOpen} onClose={() => closeModal("product")}  method={"post"} />}
            {isModalsOpen.isCategoryModalOpen && <CategoryModal isOpen={isModalsOpen.isCategoryModalOpen} onClose={() => closeModal("category")} method={"post"} />}
          </>

      }






    </>
  );
};

export default Dashboard;