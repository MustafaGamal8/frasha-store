import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import Modal from 'react-modal';

Modal.setAppElement("body");

export default function OrderModal({ isOpen, onClose, cart }) {
  const [sure, setSure] = useState(false);

  // Calculate total price based on the products in the cart
  const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);

  const handelOrder = () => {
    console.log(sure);
    // Perform the order logic here
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-70 z-[10]">
      <div className="relative flex flex-col justify-between bg-white rounded-lg p-8 w-[550px] h-[500px] max-w-full mx-4">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition duration-300">
          <IoClose size={24} />
        </button>

        <h1 className="text-2xl font-bold mb-4 text-center">تفاصيل الطلب</h1>

        {/* Product details */}
        <div className="flex flex-col gap-2">
          {cart.map((product, index) => (
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

        <div className='flex flex-col  mt-10 gap-10'>
        <div className="flex justify-end items-center  ">
          <input id="sure" onChange={(e) => setSure(e.target.checked)} type="checkbox" className="p-1 mr-2 " />
          <label htmlFor="sure" className="font-bold">هل أنت متأكد</label>
        </div>

        

        <button
          onClick={handelOrder}
          disabled={!sure}
          className={`text-white drop-shadow-md p-2 rounded m-auto w-[80%] text-center font-bold ${
            !sure ? 'cursor-not-allowed bg-red-400' : 'cursor-pointer bg-green-300'
          }`}
        >
          طلب
        </button>
        </div>
      </div>
    </Modal>
  );
}
