import Navbar from "./components/Navbar";
import Image from "next/image";
import i1 from "./assets/i1.jpg"
import i2 from "./assets/i2.png"
import { RxLockClosed, RxLightningBolt, RxScissors, RxRocket, RxDrawingPin } from "react-icons/rx";


import Product from "./components/Product";
const Page = () => {
  return (
    <>
      <Navbar />

      <header className="relative w-full h-[450px] bg-primary flex items-center  justify-around z-[-1] p-2 ">
        <div className="w-[500px] md:h-full  rounded overflow-hidden"><Image className="h-full w-full obecjt-cover" src={i2} /></div>
        <h1 className="text-white md:text-3xl text-xl text-right">متخصصون في بيع منتجات الهاند ميد والتطريز <br />والهدايا و الملابس والاكسسورات</h1>

        <div className="w-full absolute -bottom-1 left-0 z-[-2] ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity={1} d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          </svg>

        </div>
      </header>


      <div className="w-full flex items-center justify-center mt-20 drop-shadow-md"><Image width={250} height={250} src={"/logo.png"} /></div>

      <section className="w-full flex flex-wrap items-center justify-center gap-16 ">

        <div className="group relative flex flex-col items-center gap-3 hover:bg-none bg-white p-4 px-12 rounded border-t-2 border-primary  drop-shadow-md">
          <span className=" absolute top-0 left-0 w-full h-0 group-hover:h-full bg-secondary transition-all duration-300 "></span>
          <div className="rounded p-5 bg-secondary group-hover:bg-white group-hover:text-secondary text-white">
            <RxLockClosed />
          </div>
          <h1 className="text-2xl group-hover:text-white ">أمان</h1>
        </div>

        <div className="group relative flex flex-col items-center gap-3 hover:bg-none bg-white p-4 px-12 rounded border-t-2 border-primary  drop-shadow-md">
          <span className=" absolute top-0 left-0 w-full h-0 group-hover:h-full bg-secondary transition-all duration-300 "></span>
          <div className="rounded p-5 bg-secondary group-hover:bg-white group-hover:text-secondary text-white">
            <RxLightningBolt />
          </div>
          <h1 className="text-2xl group-hover:text-white ">سرعة</h1>
        </div>
        <div className="group relative flex flex-col items-center gap-3 hover:bg-none bg-white p-4 px-12 rounded border-t-2 border-primary  drop-shadow-md">
          <span className=" absolute top-0 left-0 w-full h-0 group-hover:h-full bg-secondary transition-all duration-300 "></span>
          <div className="rounded p-5 bg-secondary group-hover:bg-white group-hover:text-secondary text-white">
            <RxScissors />
          </div>
          <h1 className="text-2xl group-hover:text-white ">جودة</h1>
        </div>
        <div className="group relative flex flex-col items-center gap-3 hover:bg-none bg-white p-4 px-12 rounded border-t-2 border-primary  drop-shadow-md">
          <span className=" absolute top-0 left-0 w-full h-0 group-hover:h-full bg-secondary transition-all duration-300 "></span>
          <div className="rounded p-5 bg-secondary group-hover:bg-white group-hover:text-secondary text-white">
            <RxRocket />
          </div>
          <h1 className="text-2xl group-hover:text-white ">ابتكار</h1>
        </div>
      </section>


      <Product />
    </>
  );
}

export default Page;
