"use client";
import { useEffect, useState } from "react";
import LoadingProduct from "./LoadingProduct";
import Product from "./Product";
import MyFlickityComponent from "./Slider";

export default function ProductsByCategorySection({ isloading, category }) {
  const [loading, setLoading] = useState(isloading || true);

  useEffect(() => {
    setLoading(isloading)
  }, [isloading])




  return (
    <section className="w-[80%] mx-auto  flexitems-center gap-16  p-2">



      {
        loading ?

          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className='md:w-[330px] w-[75%] m-5'><LoadingProduct /></div>
          ))
          :
          category && category.products.length == 0 ?
            <h1 className="text-center text-3xl font-bold  text-secondary my-20"> ....لا يوجد منتجات</h1>
            :
            (

              <div className="w-full h-full flex flex-col  ">
                <h1 className="text-right text-2xl font-bold  text-secondary my-5 mx-5">{category.name}({category.products.length})</h1>



              
                  <MyFlickityComponent >

                    {
                      category && category.products?.map((product, index) => (
                        <div key={index} className="snap-center w-[300px] mx-4">
                          <div className=" bg-slate-300 w-full h-full">
                              <Product product={product} />
                          </div>
                        </div>
                      ))
                    }
                  </MyFlickityComponent>

              </div>

            )
      }
    </section>
  )
}
