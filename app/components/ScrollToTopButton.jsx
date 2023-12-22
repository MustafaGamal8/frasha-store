"use client";
import { useEffect, useState } from 'react';
import { IoIosArrowUp } from "react-icons/io";
export default function ScrollToTopButton() {
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
        isVisible ? 'block' : 'hidden'
      } fixed bottom-4 right-4 bg-white text-secondary px-4 py-4 rounded-full drop-shadow-md transition-all duration-300`}
    >
      <IoIosArrowUp />      
    </button>
  );
}
