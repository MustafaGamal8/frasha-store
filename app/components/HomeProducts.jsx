import Product from "./Product";
import Link from "next/link";
export default function HomeProducts() {
  return (
    <section className="w-full m-auto my-28 ">
      
    <ul className="w-full md:w-[80%] flex flex-wrap flex-row-reverse gap-6 mb-10 p-1">
      <li className="category-item active">كل المنتجات</li>
      <li className="category-item">طارات</li>
      <li className="category-item">مناديل كتب كتاب</li>
      <li className="category-item">هدايا</li>        
    </ul>

    <section className="w-full flex flex-wrap items-center justify-center gap-9">
      <div className="md:w-[330px] w-[75%] m-5"><Product /></div>
      <div className="md:w-[330px] w-[75%] m-5"><Product /></div>
      <div className="md:w-[330px] w-[75%] m-5"><Product /></div>
      <div className="md:w-[330px] w-[75%] m-5"><Product /></div>
      <div className="md:w-[330px] w-[75%] m-5"><Product /></div>
      <div className="md:w-[330px] w-[75%] m-5"><Product /></div>
    </section>

    <Link href={"/products"}  className="w-[150px] block  rounded-lg p-4 bg-primary  hover:bg-secondary text-white text-xl m-auto text-center cursor-pointer transition-all ">عرض الكل</Link>

  </section>
  )
}
