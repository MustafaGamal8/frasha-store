"use client";
import { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import CategoryModal from './CategoryModal';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { getCookie } from 'cookies-next';
import Link from 'next/link';

export default function CategoriesTable() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isCategoreyModalOpen, setIsCategoreyModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.error || 'حدث خطأ ما');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);



  const handleSelect = (event) => {
    const productId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedCategories([...selectedCategories, productId]);
    } else {
      const updatedSelectedCategories = selectedCategories.filter(
        (id) => id !== productId
      );
      setSelectedCategories(updatedSelectedCategories);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allCategoryIds = categories.map((category) => category.id);
      setSelectedCategories(allCategoryIds);
    } else {
      setSelectedCategories([]);
    }
  };


  const handleDelete = async () => {
    if (selectedCategories.length === 0) {
      toast.error('يجب تحديد عنصر واحد علي الاقل');
      return
    }
    try {
      toast.info('جاري الحذف...');
      await axios.delete('/api/categories', {
        data: {
          categoriesIds: selectedCategories
        },
        headers: {
          Authorization: `Bearer ${getCookie('token')}`
        }
      });
      toast.success('تم الحذف بنجاح');
      setSelectedCategories([]);
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.error || 'حدث خطأ ما');
    }
  }

  const handelEdit = () => {
    if (selectedCategories.length === 0 || selectedCategories.length > 1) {
      toast.error('يجب تحديد عنصر واحد فقط');
      return
    }
    setIsCategoreyModalOpen(true);

  }


  return (
    <>

      <>
        {
          loading ?

            (
              <div className="w-full h-[550px] bg-slate-200 animate-pulse flex flex-col items-center justify-evenly pt-10 flex-wrap gap-5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="w-[80%] h-[40px] bg-slate-300 animate-pulse"></div>
                ))}
              </div>
            )
            :
            categories.length == 0 ?
              <h1 className="text-center text-2xl font-bold  text-secondary my-10">لا يوجد منتجات في هذا القسم</h1>
              :
              (
                <section className="bg-white p-2 overflow-x-auto w-full rounded-t-lg">

                  <table className="w-full border-collapse overflow-x-auto whitespace-nowrap overflow-hidden">
                    <thead>
                      <tr>
                        <th className="border-r border-gray-300 p-1 px-2 bg-gray-200">زيارة</th>
                        <th className="border-r border-gray-300 p-1 px-2 bg-gray-200">وقت الاضافة</th>
                        <th className="border-r border-gray-300 p-1 px-2 bg-gray-200">عدد منتجات القسم</th>
                        <th className="border-r border-gray-300 p-1 px-2 bg-gray-200">القسم</th>
                        <th className="w-[120px] p-1 bg-gray-200 rounded-tr-lg text-center">
                          <label htmlFor="select-all">تحديد الكل</label>
                          <input
                            id="select-all"
                            type="checkbox"
                            onChange={handleSelectAll}
                            checked={selectedCategories.length === categories.length}
                          />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr
                          className={`hover:bg-primary hover:text-white ${selectedCategories.includes(category.id) ? 'bg-secondary text-white' : 'bg-white'
                            }`}
                          key={category.id}
                        >
                          <td className="border p-2"><Link className="underline" target='_blank' href={`/products?categoryId=${category.id}`}>زيارة</Link></td>
                          <td className="border p-2">{(category.createdAt).substring(0, 10)}</td>
                          <td className="border p-2">{category._count.products}</td>
                          <td className="border p-2">{category.name}</td>
                          <td className="border p-2">
                            <input
                              type="checkbox"
                              value={category.id}
                              onChange={handleSelect}
                              checked={selectedCategories.includes(category.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                </section>
              )
        }

      </>



      <div className="flex items-center justify-center mx-auto w-[80%] gap-5 my-10">

        <div onClick={handleDelete} className="flex justify-between items-center gap-2 bg-green-400 text-white p-2 rounded cursor-pointer">
          <h1>حذف الاقسام({selectedCategories.length})</h1>
          <MdDelete />
        </div>

        <div onClick={handelEdit} className="flex justify-between items-center gap-2 bg-primary text-white p-2 rounded cursor-pointer">
          <h1>تعديل القسم</h1>
          <CiEdit />
        </div>

      </div>

      {isCategoreyModalOpen && <CategoryModal isOpen={isCategoreyModalOpen} onClose={() => setIsCategoreyModalOpen(false)} method={'put'} category={categories.find(category => category.id === selectedCategories[0])} />}


    </>
  )
}
