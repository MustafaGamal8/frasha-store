"use client";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Pagination from "@/app/(shop)/products/Pagination";
import { toast } from 'react-toastify';
import axios from 'axios';
import AddProductModal from "./AddProductModal";


export default function ProductsTable() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('الكل');
  const [loading, setLoading] = useState(false);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get(`/api/products?page=${currentPage}&category=${currentCategory}`),
          axios.get('/api/categories')
        ]);

        setProducts(productsResponse.data.products);
        setProductsCount(productsResponse.data.productsCount);
        setTotalPages(parseInt(productsResponse.data.productsCount / 10) + 1);

        setCategories(categoriesResponse.data);
      } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.error || 'حدث خطأ ما');
      }
      setLoading(false);
    };

    fetchData();
  }, [currentPage, currentCategory]);


  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };
  const handleSelect = (event) => {
    const productId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      const updatedSelectedProducts = selectedProducts.filter(
        (id) => id !== productId
      );
      setSelectedProducts(updatedSelectedProducts);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allProductIds = products.map((product) => product.id);
      setSelectedProducts(allProductIds);
    } else {
      setSelectedProducts([]);
    }
  };

  const handleDelete = async () => {
    if (selectedProducts.length === 0) {
      toast.error('يجب تحديد عنصر واحد علي الاقل');
      return
    }
    try {
      toast.info('جاري الحذف...');
      console.log(selectedProducts)
      await axios.delete('/api/products', {
        data: {
          productsIds: selectedProducts 
        }
      });
      toast.success('تم الحذف بنجاح');
      setSelectedProducts([]);
    } catch (error) {
      toast.error(error.response?.data?.error || 'حدث خطأ ما');
    }
  }

  const handelEdit = () => {
    if (selectedProducts.length === 0 || selectedProducts.length > 1) {
      toast.error('يجب تحديد عنصر واحد فقط');
      return
    }
    setIsProductModalOpen(true);
      
    }

  return (
    <div>
      <h1 className="text-right text-2xl font-bold my-2">
        العدد الكلي للمنتجات: <span className="text-primary">{productsCount}</span>
      </h1>

      <div  className="my-5">
          <select
            id="category"
            onChange={(e) => setCurrentCategory(e.target.value)}
            className="text-primary p-2 mx-4 text-right"
          >
            <option value="الكل">الكل</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="category">:اختار القسم</label>
        </div>

       
      {
        loading ?

         (<div className="w-full h-[550px] bg-slate-200 animate-pulse flex flex-col items-center pt-10 flex-wrap gap-5">
        {Array.from({ length: 7 }).map((_, index) => (          
        <div key={index}  className="w-[80%] h-[40px] bg-slate-300 animate-pulse"></div>
        ))}
        </div> )
        : 
        products.length == 0 ? 
        <h1 className="text-center text-4xl font-bold  text-secondary my-10">لا يوجد منتجات</h1>
        :
        (<section className="bg-white p-2 overflow-x-auto w-full">

        

        <table className="w-full border-collapse overflow-x-auto whitespace-nowrap overflow-hidden">
          <thead>
            <tr>
              <th className="border-r border-gray-300 p-1 px-2 bg-gray-200">عدد الصور</th>
              <th className="border-r border-gray-300 p-1 px-2 bg-gray-200">القسم</th>
              <th className="border-r border-gray-300 p-1 px-2 bg-gray-200">السعر</th>
              <th className="border-r border-gray-300 p-1 px-2 bg-gray-200">الاسم</th>
              <th className="w-[120px] p-1 bg-gray-200 rounded-tr-lg text-center">
                <label htmlFor="select-all">تحديد الكل</label>
                <input
                  id="select-all"
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedProducts.length === products.length}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                className={`hover:bg-primary hover:text-white ${selectedProducts.includes(product.id) ? 'bg-secondary text-white' : 'bg-white'
                  }`}
                key={product.id}
              >
                <td className="border p-2">{product.photos.length}</td>
                <td className="border p-2">{product.category.name}</td>
                <td className="border p-2">{product.price}</td>
                <td className="border p-2">{product.name}</td>
                <td className="border p-2">
                  <input
                    type="checkbox"
                    value={product.id}
                    onChange={handleSelect}
                    checked={selectedProducts.includes(product.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="w-[80%] mx-auto flex items-center justify-center p-5 mt-10">
          <Pagination currentPage={currentPage} pageCount={totalPages} onPageChange={handlePageChange} />
        </div>
      </section>)
      }

    

      <div className="flex items-center justify-center mx-auto w-[80%] gap-5 my-10">

        <div onClick={handleDelete} className="flex justify-between items-center gap-2 bg-green-400 text-white p-2 rounded cursor-pointer"> 
          <h1>حذف المنتجات({selectedProducts.length})</h1>
          <MdDelete />
        </div>

        <div onClick={handelEdit} className="flex justify-between items-center gap-2 bg-primary text-white p-2 rounded cursor-pointer">
          <h1>تعديل المنتج</h1>
          <CiEdit />
        </div>

      </div>



      {isProductModalOpen && <AddProductModal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)}   product={products.filter(product => product.id == selectedProducts[0])[0]} method={"put"} /> }

    </div>

  );
}
