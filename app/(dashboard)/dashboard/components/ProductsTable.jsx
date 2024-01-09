"use client";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Pagination from "@/app/(shop)/products/Pagination";
import { toast } from 'react-toastify';
import axios from 'axios';
import ProductModal from "./ProductModal";
import { getCookie } from "cookies-next";
import Link from 'next/link';
import { GoSearch } from "react-icons/go";


export default function ProductsTable() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('الكل');
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);




  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get(`/api/products?page=${currentPage}&categoryId=${categories.find((category) => category.name === currentCategory)?.id || 'الكل'}`),
          axios.get('/api/categories')
        ]);
        setProducts(productsResponse.data.products);
        console.log(productsResponse.data.products)
        setProductsCount(productsResponse.data.productsCount);
        setTotalPages(parseInt(productsResponse.data.productsCount / 10) + 1);

        setCategories(categoriesResponse.data);
      } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.error || 'حدث خطأ ما');
      } finally {
        setLoading(false);
      }
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

  const handelChangeCategory = (event) => {
    setCurrentCategory(event.target.value);
    setCurrentPage(1);
  }
  const handleDelete = async () => {
    if (selectedProducts.length === 0) {
      toast.error('يجب تحديد عنصر واحد علي الاقل');
      return
    }

    if (!confirm('هل تريد حذف هذه المنتجات؟')) {
      return
    }

    const loadingToast = toast.loading('جاري الحذف...');
    try {

      await axios.delete('/api/products', {
        data: {
          productsIds: selectedProducts
        },
        headers: {
          Authorization: `Bearer ${getCookie('token')}`
        }
      });
      toast.success('تم الحذف بنجاح');
      setSelectedProducts([]);
      window.location.reload();
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.error || 'حدث خطأ ما');
    } finally {
      toast.dismiss(loadingToast);
    }
  }

  const handelEdit = () => {
    if (selectedProducts.length === 0 || selectedProducts.length > 1) {
      toast.error('يجب تحديد عنصر واحد فقط');
      return
    }
    setIsProductModalOpen(true);
  }


  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      toast.info('جاري البحث ...');
      const response = await axios.get(`/api/products/search?search=${search}`);
      setProducts(response.data);
      setProductsCount(response.data.length);
    } catch (error) {
      toast.error(error.response.data.error || 'حدث خطأ ما');
    }
  }
  return (
    <div className="p-6 bg-white rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">
        العدد الكلي للمنتجات: <span className="text-primary">{productsCount}</span>
      </h1>

      <div className="my-5">
        <select
          id="category"
          onChange={handelChangeCategory}
          className="text-primary drop-shadow p-2 mx-4 text-right rounded"
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



      <form onSubmit={handleSearch} className="lg:w-[50%] md:w-[70%] w-[90%] bg-white m-auto p-2 flex items-center rounded drop-shadow my-5">
        <button className="text-white rounded text-xl bg-secondary p-1 px-3 ">بحث</button>
        <input type="text" id="search" name="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="البحث" className="w-full p-1 outline-none text-right" />
        <label htmlFor="search" className="text-primary text-xl"><GoSearch /></label>
      </form>

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
            products.length == 0 ?
              <h1 className="text-center text-2xl font-bold  text-secondary my-10">لا يوجد منتجات   </h1>
              :
              (
                <section className="bg-white p-2 overflow-x-auto w-full rounded-t-lg">




                  <table className="w-full border-collapse overflow-x-auto whitespace-nowrap overflow-hidden">
                    <thead>
                      <tr className=" bg-gray-200 ">
                        <th className="border-x border-gray-300 p-1">زيارة</th>
                        <th className="border-x border-gray-300 p-1">وقت الاضافة</th>
                        <th className="border-x border-gray-300 p-1">عدد الصور</th>
                        <th className="border-x border-gray-300 p-1">القسم</th>
                        <th className="border-x border-gray-300 p-1">السعر</th>
                        <th className="border-x border-gray-300 p-1">الاسم</th>
                        <th className="w-[120px] p-1 ">
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
                          className={`md:hover:bg-primary md:hover:text-white ${selectedProducts.includes(product.id) ? 'bg-secondary text-white' : 'bg-white'
                            }`}
                          key={product.id}
                        >
                          <td className="border p-2"><Link className="underline" target='_blank' href={`/product/${product.id}`}>زيارة</Link></td>
                          <td className="border p-2">{(product.createdAt).substring(0, 10)}</td>
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
                </section>
              )
        }

      </>




      <div className="flex items-center justify-center mx-auto w-[80%] gap-5 my-10">

        <div onClick={handleDelete} className="flex justify-between items-center gap-2 bg-red-400 text-white p-2 rounded cursor-pointer">
          <h1>حذف المنتجات({selectedProducts.length})</h1>
          <MdDelete />
        </div>

        <div onClick={handelEdit} className="flex justify-between items-center gap-2 bg-primary text-white p-2 rounded cursor-pointer">
          <h1>تعديل المنتج</h1>
          <CiEdit />
        </div>

      </div>



      {isProductModalOpen && <ProductModal isOpen={isProductModalOpen} onClose={() => setIsProductModalOpen(false)} product={products.find(product => product.id === selectedProducts[0])} method={"put"} />}

    </div>

  );
}
