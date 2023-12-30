import Image from 'next/image';
import { FiShoppingCart, FiHeart, FiLink } from 'react-icons/fi';
import  Link  from 'next/link';

const Product = ({product}) => {
  const {id, name, price, photos} = product
  return (
    <div className="w-full bg-primary drop-shadow-lg ">
      <Link href={`/product/${id}`}>
      <section className="group relative p-6 bg-[#f6f6f6] w-full h-[350px] cursor-pointer">
        <Image className="w-full h-full object-cover"  width={100} height={800} src={photos && photos[0] ? photos[0].url : '/logo.png' } alt="img" />

        <div className="group group-hover:h-[80px] h-[55px] md:h-0 w-full group-hover:flex absolute bottom-0 left-0 bg-gray-400 bg-opacity-50 z-[1] transition-all duration-300">
          <div className="md:hidden flex group-hover:flex items-center justify-around h-full w-full p-2">
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
      </Link>

      <section className="text-center text-2xl mt-2 text-white">
        <h1>{name}</h1>
        <p>{price}$</p>
      </section>
    </div>
  );
};

export default Product;
