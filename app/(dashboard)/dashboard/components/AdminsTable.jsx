"use client";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';
import AdminModal from './AdminModal';
import { getCookie } from "cookies-next";

export default function AdminsTable() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/admins', {
          headers: {
            'Authorization': getCookie('token')
          }
        });
        setAdmins(response.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.error || 'حدث خطأ ما');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [])

  
  const handleDelete = async (id) => {
    if (!confirm('هل تريد حذف هذا المسؤول؟')) {
      return
    }

      const loadingToast = toast.loading('جاري الحذف...');
      try {
        await axios.delete(`/api/admins`, {
          data: {
            id: id
          },
          headers: {
            'Authorization': getCookie('token')
          }
        });
        toast.success('تم حذف المسؤول بنجاح');
        window.location.reload();
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.error || 'حدث خطأ ما');
      }finally {
        toast.dismiss(loadingToast);
      }
  }

  const handleEdit = (id) => {
    setSelectedAdmin(id);
    setIsAdminModalOpen(true);
  }

  return (
    <>
      <section className="bg-white p-2 overflow-x-auto w-full rounded-t-lg">
        {
          loading ?

            (
              <div className="w-full h-[550px] bg-slate-200 animate-pulse flex flex-col items-center justify-evenly pt-10 flex-wrap gap-5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="w-[80%] h-[40px] bg-slate-300 animate-pulse"></div>
                ))}
              </div>
            )
            :
            admins.length == 0 ?
              <h1 className="text-center text-2xl font-bold  text-secondary my-10">لا يوجد مسؤولين</h1>
              :
              (
                <>


                  <div className="my-5 mx-2">أجمالي المسؤولين: <span className="text-primary">{admins.length}</span></div>

                  <table className="w-full border-collapse overflow-x-auto whitespace-nowrap overflow-hidden">
                    <thead>
                      <tr>
                        <th className="w-[150px] p-1 border-r border-gray-300  bg-gray-200 text-center">حذف</th>
                        <th className=" w-[150px] border-r border-gray-300 p-1 px-2 bg-gray-200">تعديل الباسوورد</th>
                        <th className="border-r border-gray-300 p-1 px-2 bg-gray-200">اسم المستخدم</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admins.map((admin) => (
                        <tr
                          className={"border-b border-gray-300 hover:bg-gray-100"}
                          key={admin.id}
                        >
                          <td className="border p-2 text-center"><button onClick={() => handleDelete(admin.id)} className=" bg-red-400 p-1 rounded text-white " >حذف</button></td>
                          <td className="border p-2 text-center"><button onClick={() => handleEdit(admin.id)} className=" bg-green-400 p-1 rounded text-white">تعديل</button></td>
                          <td className="border p-2">{admin.username}</td>

                        </tr>
                      ))}
                    </tbody>
                  </table>

                </>
              )
        }


        <div onClick={()=>setIsAdminModalOpen(true)} className="text-center text-2xl font-bold  bg-secondary text-white w-[250px] rounded p-1 mx-auto cursor-pointer hover:drop-shadow-md my-10">اضافة مسؤول</div>

        {isAdminModalOpen && <AdminModal  isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} admin={admins.find(admin => admin.id === selectedAdmin)} method={selectedAdmin ? 'put' : 'post'} />}
      </section>


    </>
  )
}
