"use client";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import { GoSearch } from "react-icons/go";
import Pagination from "./components/Pagination";
import ProductsSection from "../components/ProductsSection";
import { useSearchParams } from "next/navigation";


export default function Products() {
  const params = useSearchParams();  

  const [currentPage, setCurrentPage] = useState(params.get('page') || 1);
  const [currentCategory,setCurrentCategory] = useState(params.get('category') || 'الكل')
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState('');
  

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(`/api/products/${currentPage}?category=${currentCategory}`,);
        setProducts(response.data);
      } catch (error) {
        toast.error(error.response.data.error || 'حدث خطأ ما');
      }
    }

    async function fetchProductsCount() {
      try {
        const response = await axios.get('/api/productsCount');
        const count = parseInt(response.data / 10) + 1;
        console.log(count)
        setPageCount(count)
      } catch (error) {
        toast.error(error.message || 'حدث خطأ ما');
      }
    }

    fetchProductsCount();
    fetchProducts();
  }, [currentPage, currentCategory]);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      toast.info('جاري البحث ...');
      const response = await axios.get(`/api/products/search?search=${search}` );
      setProducts(response.data); 
    } catch (error) {
      toast.error(error.response.data.error || 'حدث خطأ ما');      
    }    
  }


  return (
    <>
      <h1 className="text-center text-3xl font-bold  text-secondary mt-10"> المنتجات - {currentCategory} <br /> {search && `(  ${search})`}</h1>

      <form onSubmit={handleSearch}  className="lg:w-[50%] md:w-[70%] w-[80%] bg-white m-auto p-2 flex items-center rounded drop-shadow mt-16">
        <button  className="text-white rounded text-xl bg-secondary p-1">بحث</button>
        <input type="text" id="search" name="search" value={search} autoComplete="off" onChange={(e) => setSearch(e.target.value)} placeholder="البحث" className="w-full p-1 outline-none text-right"  />
        <label htmlFor="search" className="text-primary text-xl"><GoSearch /></label>
      </form>

      <ProductsSection products={products} />

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Pagination currentPage={currentPage} pageCount={pageCount} onPageChange={handlePageChange} />
      </div>
    </>
  );
}

