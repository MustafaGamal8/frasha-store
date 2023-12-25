"use client";
import AddProductModal from "./components/AddProductModal";
import { useState } from "react";

const Page = () => {  
  
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <>    
    <h1 className="text-3xl font-bold mb-5 text-center text-secondary my-10">لوحة التحكم</h1>

    
    <div className="flex flex-col justify-center bg-white drop-shadow-lg w-[50%] m-auto p-5  h-80"> 
    <button onClick={openModal} className="bg-primary text-white px-4 py-2 rounded w-[250px]">اضافة منتج</button> 
    </div>
    <AddProductModal   isOpen={isModalOpen} onClose={closeModal} />
        
    </>
    
  );
}

export default Page;
