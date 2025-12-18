"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

function truncateText(text, maxLength = 30) {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength - 5) + "..." : text;
}

export default function Card({ activationType, prices, ...product }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const allPrices = Object.values(prices || {}).flat();

  const activationPriceData = (() => {
    const discountedPrices = allPrices
      .map(entry => {
        const platform = Object.keys(entry).find(key => key === "PS4" || key === "PS5");
        if (!platform) return null;

        const basePrice = entry[platform];
        const saleAmount = entry.sale_amount || 0;

        if (!basePrice) return null;
        if (saleAmount > 0) {
          return {
            basePrice,
            discountedPrice: Math.round(basePrice * (1 - saleAmount / 100)),
            hasDiscount: true,
            sale: saleAmount
          };
        }

        return null;
      })
      .filter(Boolean);

    if (discountedPrices.length > 0) {
      return discountedPrices.reduce((min, p) =>
        p.discountedPrice < min.discountedPrice ? p : min
      );
    }

    const normalPrice = allPrices
      .map(entry => {
        const platform = Object.keys(entry).find(key => key === "PS4" || key === "PS5");
        if (!platform) return null;
        const basePrice = entry[platform];
        if (!basePrice) return null;
        return {
          basePrice,
          discountedPrice: basePrice,
          hasDiscount: false,
        };
      })
      .filter(Boolean);

    return normalPrice[0] || null;
  })();

  const hasDiscount = activationPriceData?.hasDiscount || false;

  const hasRussianVoice = Object.values(product.voice_acting || {}).some(
    arr => Array.isArray(arr) && arr.includes("ru")
  );

  const handleClick = () => {
    if (product.id) {
      localStorage.setItem("lastClickedProductId", product.id);
    }
  };

  const normalizedTitle = product.title?.replace(/'/g, "'");

  return (
    <Link
      href={`/games/${product.slug}`}
      onClick={handleClick}
      className="block w-full group"
    >
      <div className="relative bg-[#1e1f2e] rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 hover:border-[#6366f1]/50 transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-xl">
        {/* Image section */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-900">
          <Image
            src={product.main_image_url}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
          
          {/* Badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            {hasDiscount && (
              <div className="bg-red-500 flex items-center gap-1.5 px-3 py-1.5 rounded-lg shadow-xl backdrop-blur-sm border border-red-400/50">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
                <span className="font-black text-white text-xs md:text-sm">
                  -{Math.round(activationPriceData.sale)}%
                </span>
              </div>
            )}
            {hasRussianVoice && (
              <div className="bg-white/95 backdrop-blur-sm flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shadow-md border border-white/50">
                <Image
                  src="/img/russia.png"
                  alt="russian flag"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
                <span className="font-bold text-gray-900 text-xs">
                  Рус
                </span>
              </div>
            )}
          </div>

          {/* Title on image */}
          <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
            <h3 className="text-white font-black text-lg md:text-xl mb-2 line-clamp-2 drop-shadow-2xl">
              {truncateText(normalizedTitle, 25)}
            </h3>
          </div>
        </div>

        {/* Content section */}
        <div className="p-4 md:p-5 flex flex-col flex-grow bg-[#1e1f2e]">
          {/* Rating and platforms */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white font-bold text-sm md:text-base">5.0</span>
            </div>
            {product.consoles?.map((console, idx) => (
              <span
                key={idx}
                className="text-xs md:text-sm font-semibold text-[#6366f1] px-2 py-1 rounded-md bg-[#6366f1]/20 border border-[#6366f1]/30"
              >
                {console}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="mt-auto pt-4 border-t border-white/10">
            {activationPriceData ? (
              <div className="flex items-baseline gap-3 flex-wrap">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl md:text-3xl font-black text-[#6366f1]">
                    {activationPriceData.discountedPrice}₽
                  </span>
                  {hasDiscount && (
                    <span className="text-sm text-white/40 line-through">
                      {activationPriceData.basePrice}₽
                    </span>
                  )}
                </div>
                {hasDiscount && (
                  <span className="text-xs font-bold text-[#f59e0b] bg-[#f59e0b]/20 px-2 py-1 rounded border border-[#f59e0b]/30">
                    Экономия {activationPriceData.basePrice - activationPriceData.discountedPrice}₽
                  </span>
                )}
              </div>
            ) : (
              <p className="text-white/40 text-lg md:text-xl font-semibold">
                Нет в наличии
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
