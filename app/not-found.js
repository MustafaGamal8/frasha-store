
import knitting from "./assets/knitting.png";
import  Image  from 'next/image';
import  Link  from 'next/link';
export default function CustomNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center select-text">
      <h1 className="text-4xl font-bold mb-4">صفحة غير موجودة</h1>
      <p className="text-lg mb-8">عذرًا، الصفحة التي تبحث عنها غير موجودة</p>
      <div
        className="w-48 h-48 animate-pulse"
        
      >
        <Image
          src={knitting}
          alt="Image"
          className="w-full h-full drop-shadow-md object-cover"
        />
      </div>
        <Link href={"/"} className="text-lg font-bold mt-7 p-3 px-4 rounded-lg bg-[#fe86bc] text-white">الصفحة الرئيسية</Link>
    </div>
  );
}
