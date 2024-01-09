
import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getCookie } from 'cookies-next';


Modal.setAppElement('body');

export default function AdminModal({ isOpen, onClose, admin, method }) {
  const [adminData, setAdminData] = useState({
    username:  admin?.username || '',
    password: '',
    confirmPassword: '',
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password, confirmPassword } = adminData;
    if (!username || !password || !confirmPassword) {
      return toast.error('يجب عليك تعبئة جميع الحقول');

    }
    if (password !== confirmPassword) {
      return toast.error('كلمة المرور غير متطابقة');
    }
    if (password.length < 6) {
      return toast.error('كلمة المرور قصيرة جدا');
    }

    if (username.length < 6) {
      return toast.error('اسم المستخدم قصير جدا');
    }

    const loadingToast = toast.loading('جاري الحفظ...');
    try {

      if (method == "put") {
        await axios.put(`/api/admins`, {...adminData , id: admin.id}, {
          headers: {
            'Authorization': getCookie('token')
          }
        });
      }else{
        
      await axios.post('/api/signup', adminData);
      }

      toast.success('تم الحفظ بنجاح');
      window.location.reload();
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.error || 'حدث خطأ ما');
    }
    finally {
      toast.dismiss(loadingToast);
      setAdminData({
        username: '',
        password: '',
        confirmPassword: '',
      });
      onClose();
    }
  }


  const handelClose = () => {
    onClose();
    setAdminData({
      username: '',
      password: '',
      confirmPassword: '',
    })
  } 
  return (
    <Modal isOpen={isOpen} onRequestClose={handelClose} className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-70 z-[10] overflow-y-auto mb-10">
      <div className="relative flex flex-col justify-between bg-white rounded-lg p-8 w-[550px]  max-w-full mx-4">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition duration-300">
          <IoMdClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-10 text-right">{admin ? 'تعديل المسؤول' : 'اضافة مسؤول'}</h2>

        

          <form onSubmit={handleSubmit}>

          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-semibold text-gray-700 text-right">
              اسم المستخدم
            </label>
            <input
              type="text"
              id="name"
              name="username"
              value={adminData.username}
              onChange={(e) => setAdminData({ ...adminData, username: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700 text-right">
              كلمة المرور
            </label>
            <input
              type="text"
              id="password"
              name="password"
              value={adminData.password}
              onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-semibold text-gray-700 text-right">
              تاكيد كلمة المرور
            </label>
            <input
              type="text"
              id="confirmPassword"
              name="confirmPassword"
              value={adminData.confirmPassword}
              onChange={(e) => setAdminData({ ...adminData, confirmPassword: e.target.value })}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary"
            />
          </div>


          <button
            type="submit"
            className="w-full bg-primary text-white py-2 my-5 rounded-md transition duration-300 hover:bg-secondary"
          >
            {admin ? 'تعديل المسؤول' : 'اضافة مسؤول'}
          </button>
        </form>

        


      </div>

    </Modal>
  )
}