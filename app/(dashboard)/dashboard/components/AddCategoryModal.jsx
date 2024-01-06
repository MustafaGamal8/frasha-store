
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import  Modal  from 'react-modal';
import  axios  from 'axios';
import { toast } from 'react-toastify';
import PostCategory from '@/services/postCategory';

export default function AddCategoryModal({ isOpen, onClose }) {
  const [categoryName, setCategoryName] = useState('');

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('جاري الحفظ...');
     await PostCategory(categoryName);
     toast.dismiss(loadingToast);
     setCategoryName('');
     onClose();
  }
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-70 z-[10] overflow-y-auto mb-10">
      <div className="relative flex flex-col justify-between bg-white rounded-lg p-8 w-[550px]  max-w-full mx-4">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition duration-300">
          <IoMdClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-right">إضافة قسم جديد</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700 text-right">
               اسم القسم 
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
            />
          </div>

          
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md transition duration-300 hover:bg-secondary"
          >
            إضافة القسم
          </button>
          </form>

        
      </div>

    </Modal>
  )
}
