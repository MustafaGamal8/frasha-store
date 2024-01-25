import { FaInstagram, FaFacebook ,FaFacebookMessenger } from 'react-icons/fa';
import Image from 'next/image';
import  Link  from 'next/link';
const Page = () => {
  return (
    <>
    
    <div className=" flex flex-col items-center justify-center h-full p-3">
      
      <div className="text-4xl font-bold mb-8 text-secondary">من نحن</div>
      <Image src="/logo.png" width={250} height={250} alt="Company Logo" className="w-52 h-52 mb-6" />
      
      
      
      <p className="text-black text-xl text-right mb-8">
        نحن متخصصون في بيع منتجات الهاند ميد والتطريز والهدايا والملابس والاكسسوارات. 
        نحن نؤمن بالفن والإبداع، ونسعى جاهدين لتقديم منتجات فريدة ومميزة تلبي احتياجات عملائنا الكرام
      </p>
      

      <div className="flex gap-x-5 mt-10">
        <Link href="https://www.instagram.com/invites/contact/?i=170io0t36bfzc&utm_content=1mayved" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-4xl text-gray-600 hover:text-gray-900 transition duration-300" />
        </Link>
        <Link href={'http://m.me/fraashastore?text=السلام عليكم كنت عايز استفسر عن '} target="_blank" rel="noopener noreferrer">
          <FaFacebookMessenger className="text-4xl text-gray-600 hover:text-gray-900 transition duration-300" />
        </Link>
        <Link href="https://www.facebook.com/fraashastore?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-4xl text-gray-600 hover:text-gray-900 transition duration-300" />
        </Link>
      </div>
    </div>
    </>
  );
}

export default Page;
