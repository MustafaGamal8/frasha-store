import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import  axios  from 'axios';

Modal.setAppElement("body");

export default function OrderModal({ isOpen, onClose, cart }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sure, setSure] = useState(false);

  const totalPrice = cart && cart.reduce((acc, product) => acc + product.price, 0);

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !sure) {
      toast.error('يرجى التحقق من البيانات');
      return
    }

    if (!validatePhone(phone)) {
      toast.error('يرجى ادخال رقم هاتف صحيح');
      return

    }

    const productsIds = cart && cart.map((product) => product.id);

    try {
      toast.info('جاري الطلب ...');
      await axios.post('/api/orders', { name, phone, totalPrice, productsIds  })
      toast.success('تم الطلب بنجاح')
    } catch (error) {
      toast.error(error?.response?.data?.error || 'حدث خطأ ما')
      
    }



  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-70 z-[10] overflow-y-auto">
      <div className="relative flex flex-col justify-between bg-white rounded-lg p-8 w-[550px] min-h-[500px] max-w-full mx-4">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition duration-300">
          <IoClose size={24} />
        </button>

        <h1 className="text-2xl font-bold mb-4 text-center">تفاصيل الطلب</h1>


        <section className='my-5' >

          <div className="flex flex-col gap-2">
            {cart && cart.map((product, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{product.price}</span>
                <span className='font-bold'>{product.name}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center border-t pt-4 mt-4">
            <span className="font-bold">{totalPrice}</span>
            <span className="font-bold">:المجموع</span>
          </div>


        </section>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-700 text-right">الاسم</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary "
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 text-sm font-semibold text-gray-700 text-right">رقم الهاتف</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-primary "
            />
          </div>
          <div className="flex justify-end items-center mb-4">
            <input id="sure" onChange={(e) => setSure(e.target.checked)} type="checkbox" className="p-1 mr-2" />
            <label htmlFor="sure" className="font-bold">هل أنت متأكد</label>
          </div>

          <h1 className="my-5"> يجب التواصل علي الصفحة لتأكيد الطلب *</h1>

          <button
            type="submit"
            disabled={!sure}
            className={`text-white drop-shadow-md p-2 rounded mx-auto flex items-center justify-center w-[80%] text-center font-bold ${!sure ? 'cursor-not-allowed bg-red-400' : 'cursor-pointer bg-green-300'
              }`}
          >
            طلب
          </button>

        </form>

      </div>
    </Modal>
  );
}
