import { FaFacebook, FaInstagram, FaFacebookMessenger  } from 'react-icons/fa';
import  Link  from 'next/link';

export default function Footer() {
  return (
    <footer id='footer' className="relative bg-secondary text-white pt-5 pb-[50px] mt-10">
      <div className="container mx-auto flex flex-row-reverse  items-center justify-between px-4 md:pb-0  pb-[80px]">
          <div className='text-right'>
            <h2 className="text-xl font-semibold">متجر فراشة</h2>
            <p className="mt-2">:تابعنا على وسائل التواصل الاجتماعي</p>
            <div className="flex justify-end mt-2">
              <Link
              href={'http://m.me/fraashastore?text=السلام عليكم كنت عايز استفسر عن '}
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                <FaFacebookMessenger  className="text-2xl" />
              </Link>
              <Link
                href="https://www.facebook.com/fraashastore?mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                <FaFacebook className="text-2xl" />
              </Link>
              <Link
                href="https://www.instagram.com/invites/contact/?i=170io0t36bfzc&utm_content=1mayved"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-2xl" />
              </Link>
            </div>
          </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Frasha Store. All rights reserved.
        </p>
      </div>
      </footer>
  );
}
