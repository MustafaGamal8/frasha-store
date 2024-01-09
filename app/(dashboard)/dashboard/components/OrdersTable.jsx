"use client"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { getCookie } from "cookies-next";
export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [selcetedOrders, setSelectedOrders] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/orders', {
          headers: {
            'Authorization': `Bearer ${getCookie('token')}`
          }
        });
        console.log(response)
        setOrders(response.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.error || 'حدث خطأ ما');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [])

  const handleSelect = (event) => {
    const productId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedOrders([...selcetedOrders, productId]);
    } else {
      const updatedSelectedOrders = selcetedOrders.filter(
        (id) => id !== productId
      );
      setSelectedOrders(updatedSelectedOrders);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allOrdersIds = orders.map((order) => order.id);
      setSelectedOrders(allOrdersIds);
    } else {
      setSelectedOrders([]);
    }
  };


  const handleProductSelection = (event) => {
    const selectedProductId = event.target.value;
    if (selectedProductId) {
      const productUrl = `/product/${selectedProductId}`;
      window.open(productUrl, '_blank');
    }
  };

  const handleDelete = async () => {
    if (selcetedOrders.length === 0) {
      toast.error('يجب تحديد عنصر واحد علي الاقل');
      return
    }
    const loadingToast = toast.loading('جاري الحذف...');
    try {

      await axios.delete('/api/orders', {
        data: {
          ordersIds: selcetedOrders
        },
        headers: {
          Authorization: `Bearer ${getCookie('token')}`
        }
      });
      toast.success('تم الحذف بنجاح');
      setSelectedOrders([]);
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.error || 'حدث خطأ ما');
    }
    finally {
      toast.dismiss(loadingToast);
    }
  }

  return (
    <>

      <>
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
            orders.length == 0 ?
              <h1 className="text-center text-2xl font-bold  text-secondary my-10">لا يوجد طلبات</h1>
              :
              (
                <section className="bg-white p-2 overflow-x-auto w-full rounded-t-lg">

                  <table className="w-full border-collapse overflow-x-auto whitespace-nowrap overflow-hidden">
                    <thead>
                      <tr>
                        <th className="border-r border-gray-300 p-1 px-2 bg-gray-200">وقت الطلب</th>
                        <th className="border-r border-gray-300 p-1 px-2 bg-gray-200">المنتجات المطلوبة</th>
                        <th className="border-r border-gray-300 p-1 px-2 bg-gray-200">اجمالي السعر</th>
                        <th className="border-r border-gray-300 p-1 px-2 bg-gray-200">الموبايل</th>
                        <th className="border-r border-gray-300 p-1 px-2 bg-gray-200">الاسم</th>
                        <th className="w-[120px] p-1 bg-gray-200 rounded-tr-lg text-center">
                          <label htmlFor="select-all">تحديد الكل</label>
                          <input
                            id="select-all"
                            type="checkbox"
                            onChange={handleSelectAll}
                            checked={selcetedOrders.length === orders.length}
                          />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr
                          className={`md:hover:bg-primary md:hover:text-white ${selcetedOrders.includes(order.id) ? 'bg-secondary text-white' : 'bg-white'
                            }`}
                          key={order.id}
                        >
                          <td className="border p-2">{(order.createdAt).substring(0, 10)}</td>
                          <td className="border p-2">
                            <select
                              onChange={handleProductSelection}
                              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary text-black"
                            >
                              <option value="">اختر المنتج</option>
                              {order.productsIds.map((productId, index) => (
                                <option key={productId} value={productId}>{index + 1} - المنتج</option>
                              ))}
                            </select>
                          </td>


                          <td className="border p-2">{order.totalPrice}</td>
                          <td className="border p-2">{order.phone}</td>
                          <td className="border p-2">{order.name}</td>
                          <td className="border p-2">
                            <input
                              type="checkbox"
                              value={order.id}
                              onChange={handleSelect}
                              checked={selcetedOrders.includes(order.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>



                </section>
              )
        }

      </>

      <div className="flex items-center justify-center mx-auto w-[80%] gap-5 my-10">

        <div onClick={handleDelete} className="flex justify-between items-center gap-2 bg-green-400 text-white p-2 rounded cursor-pointer">
          <h1>اكمال الطلب ({selcetedOrders.length})</h1>
        </div>
      </div>
    </>
  )
}
