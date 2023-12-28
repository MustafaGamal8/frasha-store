import { ToastContainer } from "react-toastify"
import Sidebar from "./dashboard/components/Sidebar"

import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Dashboard - Frasha Store',
  description: 'Dashboard for Frasha Store',
}


export default function Layout({ children }) {


  return (
    <>
      <main className="flex justify-between w-full h-screen overflow-y-scroll">
        <section className="w-full h-full" >
          {children}
        </section>
        <Sidebar />
      </main>



      <ToastContainer position="top-center"  autoClose={2000}/>
    </>
  )
}
