"use client";

import Image from "next/image";
import { useBasket } from "../context/BasketContext";

const BasketItem = ({ item, index }) => {
  const { toggleItemCheck, removeFromBasket, changeQuantity } = useBasket();

  const imgSrc = item.main_image_url ?? item.img;
  const price = item.price ?? 0;
  const quantity = item.quantity ?? 1;
  const totalPrice = price * quantity;

  return (
    <div className="w-full">
      <div className="premium-card rounded-2xl p-4 md:p-6 mb-4 flex items-start gap-4 md:gap-6 premium-card-hover border border-white/10">
        <input
          type="checkbox"
          checked={item.checked || false}
          onChange={() => toggleItemCheck(index)}
          className="h-5 w-5 md:h-6 md:w-6 accent-[#6366f1] mt-2 cursor-pointer"
        />

        <div className="relative w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 flex-shrink-0 rounded-xl overflow-hidden">
          <Image
            src={imgSrc}
            alt={item.title || "Товар"}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80px, 128px"
            unoptimized={imgSrc.startsWith("http")}
          />
        </div>

        <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4 min-w-0">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-base md:text-lg lg:text-xl mb-2 hover:text-[#6366f1] transition-colors line-clamp-2">
              {item.title}
            </h3>

            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex items-center gap-2 bg-white/10 rounded-xl p-1">
                <button
                  onClick={() => changeQuantity(index, quantity - 1)}
                  className="w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-[#6366f1]/30 text-white font-bold rounded-lg transition-all duration-200 hover:scale-110 flex items-center justify-center"
                >
                  −
                </button>
                <span className="text-white font-bold text-base md:text-lg min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => changeQuantity(index, quantity + 1)}
                  className="w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-[#6366f1]/30 text-white font-bold rounded-lg transition-all duration-200 hover:scale-110 flex items-center justify-center"
                >
                  +
                </button>
              </div>

              <div className="flex flex-col">
                <p className="text-white font-black text-lg md:text-xl lg:text-2xl">
                  {totalPrice}₽
                </p>
                {quantity > 1 && (
                  <p className="text-white/50 text-xs md:text-sm">
                    {price}₽ × {quantity}
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => removeFromBasket(index)}
            className="px-4 py-2 md:px-6 md:py-3 bg-red-500 hover:bg-red-600 rounded-xl font-bold text-white text-sm md:text-base transition-all duration-200 hover:scale-105 shadow-lg self-start md:self-center"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasketItem;
