import { FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative bg-secondary text-white py-10 pb-16">
      <div className="container mx-auto flex flex-row-reverse  items-center justify-between px-4">
          <div className='text-right'>
            <h2 className="text-xl font-semibold">متجر فراشة</h2>
            <p className="mt-2">:تابعنا على وسائل التواصل الاجتماعي</p>
            <div className="flex justify-end mt-2">
              <a
                href="https://www.facebook.com/fraashastore?mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
                className="mr-3"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a
                href="https://www.instagram.com/invites/contact/?i=170io0t36bfzc&utm_content=1mayved"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-2xl" />
              </a>
            </div>
          </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Frasha Store. All rights reserved.
        </p>
      </div>
      </footer>
  );
}
