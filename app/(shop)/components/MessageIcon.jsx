"use client";
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import MessengerGif from '../assets/Messenger.gif';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeftLong } from "react-icons/fa6";

const MessageIcon = () => {
  const [isVisible, setIsVisible] = useState(true);


  return (
    <>
      {isVisible ? (
        <div
          className="md:w-[90px] w-[90px] fixed md:bottom-12 bottom-8 md:right-14 right-4 z-[99] flex flex-col items-center bg-white p-1 rounded">
          <button onClick={() => setIsVisible(false)} className=" text-xl">
            <AiOutlineClose />
          </button>
          <Link
            href={'http://m.me/fraashastore?text=السلام عليكم كنت عايز استفسر عن '}
            target='_blank'
          >
            <Image className='w-full' src={MessengerGif} alt="Messenger GIF" />
            <h1>تواصل معنا</h1>
          </Link>
        </div>
      )
        :
        (
          <div onClick={() => setIsVisible(true)}  className="md:w-[35px] w-[25px] h-[100px] fixed md:bottom-16 bottom-12 right-0 z-[99] flex flex-col items-center justify-center bg-white p-1 rounded">
              <FaArrowLeftLong className='cursor-pointer' />
          </div>
        )
      }
    </>
  );
};

export default MessageIcon;
