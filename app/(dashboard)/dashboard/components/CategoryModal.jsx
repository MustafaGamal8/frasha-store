
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getCookie } from 'cookies-next';


Modal.setAppElement('body');

export default function CategoryModal({ isOpen, onClose, method, category }) {
  const [categoryName, setCategoryName] = useState(category?.name || '');



  const handleSubmit = async (e) => {
    e.preventDefault();


    const loadingToast = toast.loading(method == "put" ? 'جاري التعديل...' : 'جاري الحفظ...');
    if (method == "put") {
      await UpdateCategory(categoryName, category.id);
    } else {
      await PostCategory(categoryName);
    }

    toast.dismiss(loadingToast);
    setCategoryName('');
    onClose();
    window.location.reload();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-70 z-[10] overflow-y-auto mb-10">
      <div className="relative flex flex-col justify-between bg-white rounded-lg p-8 w-[550px]  max-w-full mx-4">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition duration-300">
          <IoMdClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-10 text-right">{method == "put" ? "تعديل القسم" : "إضافة قسم جديد"}</h2>

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
            className="w-full bg-primary text-white py-2 my-5 rounded-md transition duration-300 hover:bg-secondary"
          >
            {method == "put" ? "تعديل القسم" : "إضافة قسم جديد"}
          </button>
        </form>


      </div>

    </Modal>
  )
}



async function PostCategory(categoryName) {
  try {

    const response = await axios.post("/api/category", { categoryName: categoryName }, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      },
    });
    const { message, error } = response.data;

    if (error) {
      toast.error(error);
    } else {
      toast.success(message || 'تم اضافة المنتج بنجاح');
    }
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.error || 'فشل في اضافة المنتج');
  }
};

async function UpdateCategory(categoryName, categoryId) {

  try {
    
    const response = await axios.put("/api/category", { categoryName, categoryId}, {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`
      },
    });

    const { message, error } = response.data;

    if (error) {
      toast.error(error);
    }else {
      toast.success(message || 'تم تعديل المنتج بنجاح');
    }
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.error || 'فشل في تعديل المنتج');
  }
}