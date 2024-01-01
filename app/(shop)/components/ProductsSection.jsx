"use client";
import { useState } from "react";
import LoadingProduct from "./LoadingProduct";
import Product from "./Product";

export default function ProductsSection({ products }) {
  const [loading, setLoading] = useState(true);


  setTimeout(() => {
    setLoading(false)
  }, 2000);


  
  return (
    <section className="w-full flex flex-wrap items-center justify-center gap-9">
      

      {
        loading ? 
        (
          Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className='md:w-[330px] w-[75%] m-5'><LoadingProduct/></div>
        ))
        )
        :

        (products &&  products.map((product, index) => (
          <div key={product.id} className="md:w-[330px] w-[75%] m-5">
            <Product product={product} />
          </div>
        ))
        ) 


      }







        {/* {
          products.length === 0 ?
           (
            loading ? Array.from({ length: 4 }).map((_, index) => (

              <div key={index} className='md:w-[330px] w-[75%] m-5'><LoadingProduct/></div>
            ))
            :
            <h1 className="text-center text-3xl font-bold  text-secondary my-20"> ....لا يوجد منتجات</h1>

          ) :
            (products.map((product, index) => (
              <div key={product.id} className="md:w-[330px] w-[75%] m-5">
                <Product product={product} />
              </div>
            ))
            )
        } */}
      </section>
  )
}
