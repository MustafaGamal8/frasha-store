"use client";

import "../../styles/random.css";

export function LoginLoader() {

  return (
    <div className="newtons-cradle">
      <div className="newtons-cradle__dot" />
      <div className="newtons-cradle__dot" />
      <div className="newtons-cradle__dot" />
      <div className="newtons-cradle__dot" />
    </div>
  )
}



import { useEffect, useState } from 'react';
import { IoIosArrowUp } from "react-icons/io";

export  function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`${
        isVisible ? 'fixed' : 'hidden'
      }  bottom-4 left-4 bg-white text-secondary px-4 py-4 rounded-full drop-shadow-md transition-all duration-300 z-[99]`}
    >
      <IoIosArrowUp />      
    </button>
  );
}