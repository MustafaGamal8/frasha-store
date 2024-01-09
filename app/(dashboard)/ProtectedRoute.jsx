"use client"
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react"
import CustomNotFound from "../not-found";
import Sidebar from "./dashboard/components/Sidebar";
import Loading from "../loading";


export default function ProtectedRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCookie("token") ? setIsAdmin(true) : setIsAdmin(false);
  }, [])

  setTimeout(() => {
    setLoading(false)
  }, 300);

  return (
    <>
      {
        loading && <Loading   /> 
      }
      {
        isAdmin &&  isAdmin ?
          <>
            <main className="flex flex-col-reverse md:flex-row justify-between w-full h-screen ">
              <section className="w-full h-full "  >
                {children}
              </section>

              <div className="md:w-[100px] w-full h-[70px]"></div>

              <Sidebar />
            </main>
          </> : <CustomNotFound msg="الرجاء تسجيل الدخول" />
      }</>
  )
}
