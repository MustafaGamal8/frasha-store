import ProductTable from "../components/ProductsTable";

export default function page() {
  return (
    <div className="relative h-full ">

      <div className="w-[500px] h-[500px] rounded-full bg-secondary absolute bottom-[-250px] left-[-250px] -z-10"></div>
      <h1 className="text-center text-4xl font-bold  text-secondary my-10">المنتجات</h1>

      <div className="md:w-[80%] w-[95%] mx-auto my-16 "><ProductTable /></div>
      </div>
  )
}