import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';

function Slider({ photos }) {
  return (
    <div className="flex justify-center items-center h-full">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        loop={true}
        pagination={{ clickable: true, currentClass: "swiper-pagination-bullet" }}
        autoplay={true}
        slidesPerView={1}
        navigation
        grabCursor={true}
        className='w-full h-full'
      >
        {photos &&
          photos.map((photo, index) => (
            <SwiperSlide key={index} className=' h-full w-full flex justify-center items-center'>
              <div className="flex items-center justify-center w-full h-full ">
                <img
                  className="w-[500px] h-full object-contain rounded-md"
                  src={photo.url}
                  alt={"صورة المنتج"}
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default Slider;
