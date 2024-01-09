import AdminsTable from "../components/AdminsTable";

export default function page() {
  return (
    <>

      <h1 className="text-center text-4xl font-bold  text-secondary my-10">المسؤولين</h1>

      
      <div className="md:w-[80%] w-[95%] mx-auto my-16 "><AdminsTable /></div>

    </>
  )
}
