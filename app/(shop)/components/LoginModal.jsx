import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Modal from 'react-modal';
import { IoEye, IoEyeOff, IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { LoginLoader } from './Random';
import { setCookie } from 'cookies-next';
import axios from 'axios';


Modal.setAppElement("body")

export default function LoginModal({ isOpen, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error('يرجي ادخال جميع البيانات');
    }
    setLoading(true);

    try {
      const response = await axios.post(`/api/login`, {
        username,
        password,
      });

      let token = response.headers['authorization'];
      token = token.replace('Bearer ', '')

      setCookie('token', token, {
        maxAge: 24 * 60 * 60, // 1 day
      })

      toast.success(response.data.message || "تم تسجيل الدخول بنجاح");

      
      setUsername('');
      setPassword('');
      onClose();
      router.push('/dashboard');
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.error || "فشل في تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };



  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-70 z-[10]">
      <div className="relative flex flex-col justify-between bg-white rounded-lg p-8 w-[550px] h-[430px] max-w-full mx-4" >
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition duration-300">
          <IoClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-right">تسجيل الدخول</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-sm font-semibold text-gray-700 text-right">اسم المستخدم</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary "
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700 text-right">كلمة المرور</label>
            <div className="flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary  pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 transform translate-y-1 right-2 focus:outline-none"
              >
                {showPassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md transition duration-300 hover:bg-secondary"
          >
            تسجيل الدخول
          </button>
          {loading && <div className='flex mt-6 justify-center'><LoginLoader /></div>}
        </form>
        <p className=' text-center  select-text text-sm'>تسجيل الدخول خاص بمسؤلين الموقع فقط*</p>
      </div>
    </Modal>
  );
}
