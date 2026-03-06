import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { getBanners } from '../../../services/airtableService';

export const AutoSliderBanner = () => {
  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => {
    getBanners().then(setBanners);
  }, []);

  if (banners.length === 0) {
    return (
      <div className="w-full aspect-[21/9] bg-gray-100 animate-pulse rounded-xl"></div>
    );
  }

  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        className="overflow-hidden"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img
              src={banner.imgUrl}
              alt={`Banner ${index}`}
              className="w-full aspect-[21/9] object-cover"
              referrerPolicy="no-referrer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
