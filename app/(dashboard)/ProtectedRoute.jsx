"use client"
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react"
import CustomNotFound from "../not-found";
import Sidebar from "./dashboard/components/Sidebar";
import Loading from "../loading";


export default function ProtectedRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCookie("token") ? setIsAdmin(true) : setIsAdmin(false);
  }, [])

  setTimeout(() => {
    setLoading(false)
  }, 1000);

  return (
    <>
      {
        loading && <Loading   /> 
      }
      {
        isAdmin ?
          <>
            <main className="flex justify-between w-full h-screen overflow-y-scroll">
              <section className="w-full h-full" >
                {children}
              </section>
              <Sidebar />
            </main>
          </> : <CustomNotFound msg="الرجاء تسجيل الدخول" />
      }</>
  )
}
