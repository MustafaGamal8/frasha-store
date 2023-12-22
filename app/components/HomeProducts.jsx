import Product from "./Product";

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
      <div className="md:w-[330px] w-[90%] m-5"><Product /></div>
      <div className="md:w-[330px] w-[90%] m-5"><Product /></div>
      <div className="md:w-[330px] w-[90%] m-5"><Product /></div>
      <div className="md:w-[330px] w-[90%] m-5"><Product /></div>
      <div className="md:w-[330px] w-[90%] m-5"><Product /></div>
      <div className="md:w-[330px] w-[90%] m-5"><Product /></div>
    </section>

    <div className="w-[150px] rounded-lg p-4  bg-secondary text-white text-xl m-auto text-center cursor-pointer">عرض الكل</div>

  </section>
  )
}
