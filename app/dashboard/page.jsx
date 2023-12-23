"use client";
import { deleteCookie, getCookie } from "cookies-next";
import  Link  from 'next/link';
import { useRouter } from "next/navigation";

const Page = () => {
  const token =  getCookie("token");
  const router = useRouter();


  const logout = () => {
    deleteCookie("token");
    router.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
  return (
    <>    
    {
      token ? (<div>
        <h1>Dashboard</h1>
        <button className=" bg-slate-700 p-4 text-white m-4 rounded" onClick={logout}>Logout</button>
      </div>): (
        <>
        <h1>انت غير مسجل</h1>
        <Link href="/" className="bg-slate-700 p-4 text-white m-10 rounded">اذهب الي الصفحة الرئيسية</Link>
        </>
      )
    }

    </>
    
  );
}

export default Page;
