"use client";

import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../Games/Card";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function GamesSwiper({ products = [] }) {
  const randomized = shuffleArray(products);

  return (
    <div className="w-full max-w-[1400px] mx-auto py-12 md:py-16 bg-[#0d0e14]">
      <div className="relative">
        <div className="flex items-center justify-between mb-8 md:mb-12 px-4 md:px-0">
          <button 
            className="swiper-button-prev-games hidden md:flex w-14 h-14 rounded-xl bg-[#1e1f2e] border border-white/10 text-white hover:text-[#6366f1] flex items-center justify-center transition-all duration-200 hover:scale-110" 
            aria-label="Previous Slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center flex-1">
            Новинки
          </h2>
          <button 
            className="swiper-button-next-games hidden md:flex w-14 h-14 rounded-xl bg-[#1e1f2e] border border-white/10 text-white hover:text-[#6366f1] flex items-center justify-center transition-all duration-200 hover:scale-110" 
            aria-label="Next Slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <Swiper
          spaceBetween={20}
          modules={[Navigation, Pagination, Autoplay, Scrollbar]}
          slidesPerView="auto"
          breakpoints={{
            320: { 
              slidesPerView: 1,
              spaceBetween: 16,
            },
            640: { 
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: { 
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: { 
              slidesPerView: 4,
              spaceBetween: 24,
            },
            1280: { 
              slidesPerView: 5,
              spaceBetween: 24,
            },
          }}
          navigation={{ nextEl: ".swiper-button-next-games", prevEl: ".swiper-button-prev-games" }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="!pb-12"
        >
          {randomized.map((item, index) => (
            <SwiperSlide key={item.id || item.slug || index} className="!w-auto">
              <div className="w-[280px] md:w-[300px]">
                <Card {...item} activationType="with_activation" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
