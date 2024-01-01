"use client"
import { FiChevronsLeft, FiChevronsRight } from 'react-icons/fi';
export default function Pagination  ({ currentPage, pageCount, onPageChange })  {

  const lastNumber = pageCount;
  const numbers = [];

  for (let i = (currentPage == 1 ? 1 : currentPage - 1); i <= (pageCount < currentPage + 5 ? currentPage : 5); i++) {
    numbers.push(i);
  }

  return (
    <>
      {
        (!pageCount || !currentPage ) ? <div className='w-[100px] bg-slate-300 animate-pulse h-10 rounded'></div>
        :(<ul className="flex items-center gap-3 text-xl ">
        <li onClick={() => onPageChange(1)} className="text-primary hover:text-secondary cursor-pointer">
          <FiChevronsLeft />
        </li>


        {numbers.map((number) => (
          <li key={number} onClick={() => onPageChange(number)} className={`text-primary hover:text-secondary cursor-pointer p-1 ${currentPage == number ? 'bg-slate-300 rounded text-white' : ''}`}>{number}</li>
        ))}
        <li>...</li>
        {
          lastNumber == currentPage ? null:
          <li onClick={() => onPageChange(lastNumber)} className="text-primary hover:text-secondary cursor-pointer ">{lastNumber}</li>

        }


        <li onClick={() => onPageChange(pageCount)} className="text-primary hover:text-secondary cursor-pointer">
          <FiChevronsRight />
        </li>
      </ul>)
      }


    </>
  )
};

