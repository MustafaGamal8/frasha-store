"use client";
import { useEffect, useState } from "react";
import LoadingProduct from "./LoadingProduct";
import Product from "./Product";

export default function ProductsSection({ products,isloading }) {
  const [loading, setLoading] = useState(isloading || true);
  const [myproducts, setMyProducts] = useState(products);

  useEffect(() => {
    setLoading(isloading)
    setMyProducts(products)
  }, [isloading])



  
  return (
    <section className="w-full flex flex-wrap items-center justify-center gap-9">
{
        loading ?

        Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='md:w-[330px] w-[75%] m-5'><LoadingProduct/></div>
        ))
        : 
        products.length == 0 ? 
        <h1 className="text-center text-3xl font-bold  text-secondary my-20"> ....لا يوجد منتجات</h1>
        :
        (products.map((product, index) => (
          <div key={product.id} className="md:w-[330px] w-[70%] m-5">
            <Product product={product} />
          </div>
        ))
        )
      }
      </section>
  )
}
