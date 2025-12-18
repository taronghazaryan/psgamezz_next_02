"use client";

import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Card from "../Card";
import { fetchGamesPage } from "../../../api/games";

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

export default function Products() {
  const [saleProducts, setSaleProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadPages(numPages = 3) {
    let products = [];
    let nextUrl = undefined;
    for (let i = 0; i < numPages; i++) {
      const { results, next } = await fetchGamesPage(nextUrl);
      products = products.concat(results);
      if (!next) break;
      nextUrl = next;
    }
    return products;
  }

  useEffect(() => {
    async function loadData(url = "/api/games/?has_discount=true") {
      try {
        let saleCandidates = [];
        let nextUrl = undefined;
        for (let i = 0; i < 5 && saleCandidates.length < 25; i++) {
          const { results, next } = await fetchGamesPage(url);
          saleCandidates = saleCandidates.concat(results);
          if (!next) break;
          nextUrl = next;
        }

        const filteredSale = saleCandidates.filter(product => {
          if (!product.prices) return false;
          return Object.values(product.prices).some(priceList =>
            priceList.some(priceItem => priceItem.sale_amount > 0)
          );
        });
        setSaleProducts(shuffleArray(filteredSale).slice(0, 25));

        const popular = await loadPages(3);
        const popularSorted = popular
          .sort((a, b) => (b.rate || 0) - (a.rate || 0))
          .slice(0, 50);
        setPopularProducts(popularSorted);

        const newGames = await loadPages(3);
        setNewProducts(shuffleArray(newGames).slice(0, 50));
      } catch (e) {
        setError(e.message || "Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return (
    <div className="py-12 text-center">
      <div className="inline-block animate-pulse text-white/60 font-bold text-xl">Загрузка...</div>
    </div>
  );
  if (error) return (
    <div className="py-12 text-center">
      <div className="text-red-400 font-bold text-xl">Ошибка: {error}</div>
    </div>
  );

  function renderSwiper(title, productsList, prevClass, nextClass, showEmptyMessage = false) {
    return (
      <div className="w-full max-w-[1400px] mx-auto mb-16 md:mb-20">
        <div className="relative">
          <div className="flex items-center justify-between mb-8 md:mb-12 px-4 md:px-0">
            <button 
              className={`${prevClass} hidden md:flex w-14 h-14 rounded-xl bg-[#1e1f2e] border border-white/10 text-white hover:text-[#6366f1] flex items-center justify-center transition-all duration-200 hover:scale-110`} 
              aria-label={`Previous Slide ${title}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center flex-1">
              {title}
            </h2>
            <button 
              className={`${nextClass} hidden md:flex w-14 h-14 rounded-xl bg-[#1e1f2e] border border-white/10 text-white hover:text-[#6366f1] flex items-center justify-center transition-all duration-200 hover:scale-110`} 
              aria-label={`Next Slide ${title}`}
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
            navigation={{ nextEl: `.${nextClass}`, prevEl: `.${prevClass}` }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="!pb-12"
          >
            {productsList.map((item, index) => (
              <SwiperSlide key={`${item.id || item.slug || item.title}-${index}`} className="!w-auto">
                <div className="w-[280px] md:w-[300px]">
                  <Card {...item} activationType="with_activation" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {showEmptyMessage && productsList.length === 0 && (
            <p className="mt-8 text-center text-white/60 font-semibold text-lg">Пока нет распродажи</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-16 md:gap-20 lg:gap-24 py-8 md:py-12">
      {saleProducts?.length > 0 && (
        renderSwiper(
          "Распродажа 🚨",
          saleProducts,
          "swiper-button-prev-custom1",
          "swiper-button-next-custom1",
          true
        )
      )}
      {renderSwiper("Популярные", popularProducts, "swiper-button-prev-custom2", "swiper-button-next-custom2")}
      {renderSwiper("Новинки", newProducts, "swiper-button-prev-custom3", "swiper-button-next-custom3")}
    </div>
  );
}
