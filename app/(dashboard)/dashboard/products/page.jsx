import ProductTable from "../components/ProductsTable";

export default function page() {
  return (
    <div>
      
      <h1 className="text-center text-4xl font-bold  text-secondary my-10">المنتجات</h1>
      <div className="w-[80%] mx-auto my-16 "><ProductTable /></div>
      </div>
  )
}