
import Image from "next/image";
import i2 from "../assets/i2.png"
import { RxLockClosed, RxLightningBolt, RxScissors, RxRocket, RxDrawingPin } from "react-icons/rx";

const sectionData = [
  {
    id: 1,
    icon: <RxLockClosed />,
    title: 'أمان',
  },
  {
    id: 2,
    icon: <RxLightningBolt />,
    title: 'سرعة',
  },
  {
    id: 3,
    icon: <RxScissors />,
    title: 'جودة',
  },
  {
    id: 4,
    icon: <RxRocket />,
    title: 'ابتكار',
  },
];

export default function Header() {
  return (
    <header>
      <section className="relative w-full h-[450px] bg-primary flex md:flex-row flex-col-reverse items-center  justify-around z-[-1] p-2 ">
        <div className="w-[300px] md:w-[600px] h-full  rounded overflow-hidden"><Image className="h-full w-full object-contain" src={i2} alt="img" /></div>
        <h1 className="text-white md:text-3xl text-xl text-right md:mt-0 mt-10">متخصصون في بيع منتجات الهاند ميد والتطريز <br />والهدايا و الملابس والاكسسورات</h1>

        <div className="w-full absolute -bottom-1 left-0 z-[-2] ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#f7f2fb" fillOpacity={1} d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
          </svg>

        </div>
      </section>

      <div className="w-full flex items-center justify-center md:mt-20 drop-shadow-md"><img className="w-[250px] h-[250px]" src={"/logo.png"} alt="img" /></div>

      <section className="w-full flex flex-wrap items-center justify-center gap-16  p-4 ">
        {sectionData.map((item) => (
          <div key={item.id}
            className="group relative flex flex-col items-center gap-3 hover:bg-none bg-white p-4 px-8 md:px-12 rounded border-t-2 border-primary  drop-shadow-md"
          >
            <span className=" absolute top-0 left-0 w-full h-0 group-hover:h-full bg-primary transition-all duration-300 "></span>
            <div className="rounded p-5 bg-secondary group-hover:bg-white group-hover:text-secondary text-white">
              {item.icon}
            </div>
            <h1 className="text-2xl group-hover:text-white ">{item.title}</h1>
          </div>
        ))}

      </section>
    </header>
  )
}
