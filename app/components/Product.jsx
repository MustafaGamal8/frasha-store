import Image from 'next/image';
import { FiShoppingCart, FiHeart, FiLink } from 'react-icons/fi';

import i1 from '../assets/i1.jpg';

const Product = () => {
  return (
    <div className="w-max bg-primary m-5 drop-shadow-lg rounded-b">
      <section className="group relative p-6 bg-[#f6f6f6] w-[350px] h-[350px]">
        <Image className="w-full h-full object-cover" src={i1} />

        <div className="group group-hover:h-[80px] h-0 w-full group-hover:flex absolute bottom-0 left-0 bg-gray-400 bg-opacity-50 z-[1] transition-all duration-500">
          <div className="hidden group-hover:flex items-center justify-around h-full w-full p-2">
            <div className="text-2xl text-white cursor-pointer icon-outline">
              <FiHeart />
            </div>
            <div className="text-2xl text-white cursor-pointer icon-outline">
              <FiShoppingCart />
            </div>
            <div className="text-2xl text-white cursor-pointer icon-outline">
              <FiLink />
            </div>
          </div>
        </div>
      </section>

      <section className="text-center text-2xl mt-2 text-white">
        <h1>منتج واحد طارة</h1>
        <p>250$</p>
      </section>
    </div>
  );
};

export default Product;
