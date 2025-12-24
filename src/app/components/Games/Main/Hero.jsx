"use client";

import { useState } from "react";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  const [activeHero, setActiveHero] = useState(0);

  const games = [
    {
      img: "/fifa.jpg",
      title: "EA SPORTS FC 25 PS4 & PS5",
      description:
        "Откройте для себя новейший футбольный симулятор EA Sports FC 25. Станьте частью команды.",
      price: 2140,
    },
    {
      img: "/fifa.jpg",
      title: "FC 25 + Ps Plus Essential 3 месяца",
      description:
        "Откройте для себя новейший футбольный симулятор EA Sports FC 25. Станьте частью команды.",
      price: 2140,
    },
    {
      img: "/spiderman.jpg",
      title: "Marvel's Spider-Man 2",
      description:
        "Издание включает: Полную версию игры Marvel's Человек-Паук 2 для PS5®. Люди-паук и Питер Паркер и Майл.",
      price: 3040,
    },
  ];

  const { img, title, description, price } = games[activeHero];

  return (
    <div className="w-full max-w-[1400px]  mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 bg-[#0d0e14]">
      {/* Desktop */}
      <div className="hidden sm:grid grid-cols-4 gap-5">
        <div
          style={{ backgroundImage: `url(${img})` }}
          className="relative flex flex-col justify-end items-start px-8 py-14 col-span-3 bg-center bg-cover rounded-3xl h-[500px] premium-card-hover"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/20 via-transparent to-[#ec4899]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
          <div className="z-10">
            <h2 className="text-white font-black text-4xl md:text-5xl mb-4 drop-shadow-2xl">{title}</h2>
            <p className="text-white/90 font-medium w-full max-w-xl mb-6 line-clamp-3 text-lg">
              {description}
            </p>
            <button className="premium-button px-12 py-4 rounded-xl text-lg font-black hover:scale-105 transition-transform duration-300">
              Купить от {price}₽
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {games.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveHero(index)}
              style={{ backgroundImage: `url(${item.img})` }}
              className="relative flex items-end px-4 py-4 h-40 bg-center bg-cover rounded-3xl cursor-pointer premium-card-hover"
            >
              <div
                className={`absolute inset-0 rounded-3xl transition-all duration-300 ${
                  activeHero === index
                    ? "bg-gradient-to-r from-black/80 via-black/50 to-transparent border-2 border-[#6366f1]/50"
                    : "bg-black/60"
                }`}
              ></div>
              <p className="text-white font-bold z-10 text-sm drop-shadow-lg">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="sm:hidden">
        <Swiper
          spaceBetween={16}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: ".custom-swiper-pagination", // кастомный контейнер
          }}
          modules={[Pagination, Autoplay]}
        >
          {games.map((item, index) => (
            <SwiperSlide
              key={index}
              onClick={() => setActiveHero(index)}
              style={{ backgroundImage: `url(${item.img})` }}
              className="relative bg-center bg-cover rounded-3xl cursor-pointer aspect-square"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-3xl"></div>
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <h2 className="text-white font-bold max-sm:text-3xl text-lg mb-1 line-clamp-1 drop-shadow-lg">
                  {item.title}
                </h2>
                <p className="text-white/90 font-medium text-xl line-clamp-2 mb-2">
                  {item.description}
                </p>
                <button className="w-full py-2 rounded-lg text-xl bg-white/80 text-black font-black">
                  Купить от {item.price}₽
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Внешняя кастомная пагинация */}
        <div className="custom-swiper-pagination flex justify-center mt-2"></div>
      </div>

    </div>
  );
}
