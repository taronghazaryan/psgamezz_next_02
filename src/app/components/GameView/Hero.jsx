"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useBasket } from "../../context/BasketContext";

export default function Hero({ productItem }) {
  const { basket, addToBasket } = useBasket();
  const [psType, setPsType] = useState("PS5");
  const [activation, setActivation] = useState("с активацией");
  const [openIndex, setOpenIndex] = useState(null);
  const [openTab, setOpenTab] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const questions = [
    {
      question: 'Что такое "с активацией"?',
      answer: `Вы получаете логин и пароль от игрового аккаунта.
Далее добавляете его на консоль, включаете активацию аккаунта (общий доступ) в настройках по инструкции.
После ставите игру на установку, и она появляется на вашем аккаунте любого региона.`,
    },
    {
      question: 'Что такое "без активации"?',
      answer: `Вы получаете логин и пароль от игрового аккаунта.
Далее добавляете его на консоль, не активируете(общий доступ), и ставите игру на установку по инструкции.
После завершения установки играете на игровом аккаунте.`,
    },
    {
      question: "После оплаты. Как получить заказ?",
      answer: `После оплаты игры вы получите код заказа, который дублируется на вашу почту.
Код необходимо отправить в нашу поддержку для получения игрового аккаунта.`,
    },
    {
      question: "Что делать если РФ аккаунт?",
      answer: "Аккаунт любого региона подойдет.",
    },
  ];

  const getPriceData = () => {
    if (!productItem?.prices) return null;
    const key = activation === "с активацией" ? "with_activation" : "without_activation";
    const list = productItem.prices[key] || [];
    const match = list.find((el) => el[psType] !== undefined);
    if (!match) return null;

    return {
      price: match[psType],
      saleAmount: match.sale_amount || 0,
      price_id: match.id || null,
    };
  };

  const priceData = getPriceData();
  const selectedPrice = priceData?.price ?? null;
  const saleAmount = priceData?.saleAmount ?? 0;
  const finalPrice =
    saleAmount > 0
      ? Math.round(selectedPrice * (1 - saleAmount / 100))
      : selectedPrice;

  const alreadyInBasket = basket.some(
    (item) =>
      item.id === productItem.id &&
      item.psType === psType &&
      item.activation === activation
  );

  const mainImageUrl = productItem.main_image_url?.startsWith("http")
    ? productItem.main_image_url
    : productItem.main_image_url
    ? "http://psgamezz.ru" + productItem.main_image_url
    : "/images/default.jpg";

  const allImages = [mainImageUrl, ...(productItem.images || [])];

  return (
    <>
      <div className="relative w-full min-h-screen bg-[#0d0e14]">
        {/* Background image */}
        <div
          className="fixed top-0 left-0 w-full h-full bg-cover bg-center  opacity-15"
          style={{
            backgroundImage: `url(${productItem.images?.[0] || "/images/default.jpg"})`,
          }}
        />
        <div className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none bg-[#0d0e14]"></div>

        <div className="relative flex flex-col lg:flex-row justify-center items-start px-4 md:px-6 py-8 md:py-12 max-w-7xl mx-auto gap-8 lg:gap-10 text-white">
          
          {/* Left side - Images - Fixed width */}
          <div className="w-full max-w-[300px] flex-shrink-0 flex flex-col items-center mx-auto lg:mx-0">
            <div 
              className="relative w-full cursor-pointer group"
              onClick={() => setSelectedImage(mainImageUrl)}
            >
              <Image
                src={mainImageUrl}
                alt={productItem.title}
                width={300}
                height={320}
                className="rounded-3xl w-full h-[300px] md:w-[300px] md:h-[320px] object-cover shadow-2xl border border-white/10 group-hover:border-[#6366f1]/50 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-3xl transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#6366f1]/80 rounded-full p-3">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
            {productItem.images?.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {productItem.images.map((img, i) => (
                  <div
                    key={i}
                    className="relative cursor-pointer group"
                    onClick={() => setSelectedImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`screenshot ${i + 1}`}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover border border-white/10 group-hover:border-[#6366f1]/50 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 rounded-lg transition-all duration-300"></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right side - Content - Fixed layout */}
          <div className="flex-1 flex flex-col gap-6 min-w-0">
            {/* Main card - Fixed height */}
            <div className="flex flex-col md:flex-row bg-[#1e1f2e] rounded-3xl px-5 md:px-8 py-6 shadow-xl border border-white/10">
              {/* Left part - Fixed width */}
              <div className="flex-1 min-w-0 mb-4 md:mb-0 md:mr-6">
                <h1 className="text-2xl md:text-3xl font-black mb-4 text-white line-clamp-2">{productItem.title}</h1>

                {/* Console selection - Fixed */}
                <div className="mb-4">
                  <p className="font-semibold mb-2 text-white/80 text-sm">Консоль</p>
                  <div className="flex flex-wrap gap-2">
                    {productItem.consoles.map((btn) => (
                      <button
                        key={btn}
                        onClick={() => setPsType(btn)}
                        className={`px-3 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                          psType === btn 
                            ? "bg-[#6366f1] text-white shadow-lg" 
                            : "bg-white/10 border border-white/20 text-white hover:bg-[#6366f1]/20"
                        }`}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Activation selection - Fixed */}
                <div className="mb-4">
                  <p className="font-semibold mb-2 text-white/80 text-sm">Варианты покупки</p>
                  <div className="flex flex-wrap gap-2">
                    {["без активации", "с активацией"].map((btn) => (
                      <button
                        key={btn}
                        onClick={() => setActivation(btn)}
                        className={`px-3 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
                          activation === btn 
                            ? "bg-[#6366f1] text-white shadow-lg" 
                            : "bg-white/10 border border-white/20 text-white hover:bg-[#6366f1]/20"
                        }`}
                      >
                        {btn}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right part - Fixed width for price and button */}
              <div className="flex flex-col justify-end items-start md:items-end shrink-0 w-full md:w-auto">
                {selectedPrice !== null && (
                  <div className="flex items-center gap-3 mb-6 w-full md:w-auto justify-start md:justify-end">
                    {saleAmount > 0 ? (
                      <>
                        <span className="text-2xl md:text-3xl font-black text-[#6366f1]">{finalPrice}₽</span>
                        <span className="line-through text-white/40 text-lg">{selectedPrice}₽</span>
                        <span className="text-[#f59e0b] font-bold bg-[#f59e0b]/20 px-2 py-1 rounded border border-[#f59e0b]/30 text-sm">-{saleAmount}%</span>
                      </>
                    ) : (
                      <span className="text-2xl md:text-3xl font-black text-[#6366f1]">{selectedPrice}₽</span>
                    )}
                  </div>
                )}

                <button
                  className={`w-full md:w-[200px] lg:w-[240px] h-[44px] rounded-lg text-sm md:text-[15px] font-black transition-all duration-200 ${
                    alreadyInBasket 
                      ? "bg-white/20 cursor-not-allowed text-white/50" 
                      : "bg-[#6366f1] hover:bg-[#5555e0] text-white hover:scale-105 shadow-lg"
                  }`}
                  onClick={() => {
                    if (!alreadyInBasket && priceData?.price_id) {
                      addToBasket({
                        id: productItem.id,
                        title: productItem.title,
                        psType,
                        activation,
                        prices: productItem.prices,
                        price: finalPrice,
                        saleAmount,
                        quantity: 1,
                        product_type: "game",
                        price_id: priceData.price_id,
                        main_image_url: productItem.main_image_url,
                      });
                    }
                  }}
                  disabled={alreadyInBasket || selectedPrice === null}
                >
                  {alreadyInBasket ? "Уже в корзине" : "В корзину"}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex flex-wrap gap-3">
                {[
                  { key: "about", label: "Об игре" },
                  { key: "details", label: "Детали" },
                  { key: "faq", label: "Частые вопросы" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    className={`bg-[#1e1f2e] py-2 px-3 md:py-[7px] md:px-[12px] rounded-xl flex items-center gap-2 transition-all duration-200 hover:scale-105 border ${
                      openTab === tab.key 
                        ? "border-[#6366f1]/50 shadow-lg bg-[#6366f1]/20" 
                        : "border-white/10 bg-white/5"
                    }`}
                    onClick={() => setOpenTab(openTab === tab.key ? null : tab.key)}
                  >
                    <span className="text-white font-semibold text-sm">{tab.label}</span>
                    {openTab === tab.key ? <ChevronUp className="w-4 h-4 text-[#6366f1]" /> : <ChevronDown className="w-4 h-4 text-white/60" />}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex flex-col gap-3">
                <div className={`transition-all duration-700 overflow-hidden ${openTab === "about" ? "max-h-full opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="bg-[#1e1f2e] rounded-xl p-4 border border-white/10">
                    <p className="text-white/90">{productItem.about}</p>
                  </div>
                </div>

                <div className={`transition-all duration-700 overflow-hidden ${openTab === "details" ? "max-h-full opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="bg-[#1e1f2e] rounded-xl p-4 border border-white/10">
                    {productItem.categories?.length > 0 && <p className="mb-2 text-white/90">Жанры: {productItem.categories.join(", ")}</p>}
                    {productItem.publishers?.length > 0 && <p className="mb-2 text-white/90">Издатели: {productItem.publishers.join(", ")}</p>}
                    {productItem.voice_acting?.length > 0 && <p className="mb-2 text-white/90">Озвучка: {productItem.voice_acting.join(", ")}</p>}
                    {productItem.subtitle?.length > 0 && <p className="mb-2 text-white/90">Озвучка: {productItem.subtitle.join(", ")}</p>}                     
                  </div>
                </div>

                <div className={`transition-all duration-700 overflow-hidden ${openTab === "faq" ? "max-h-full opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="bg-[#1e1f2e] rounded-xl p-4 flex flex-col gap-2 border border-white/10">
                    {questions.map((item, index) => {
                      const isOpen = openIndex === index;
                      return (
                        <div key={index}>
                          <div className="flex items-center justify-between cursor-pointer bg-[#252732] p-3 rounded-lg border border-white/10 hover:bg-white/5 transition-all" onClick={() => setOpenIndex(isOpen ? null : index)}>
                            <p className="font-semibold text-white text-sm flex-1">{item.question}</p>
                            {isOpen ? <ChevronUp className="w-4 h-4 text-[#6366f1]" /> : <ChevronDown className="w-4 h-4 text-white/60" />}
                          </div>
                          <div className={`transition-all duration-700 overflow-hidden ${isOpen ? "max-h-48 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                            <div className="bg-[#252732] py-2 px-3 rounded-xl border border-white/10">
                              <p className="text-white/80 text-sm">{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
          >
            <X size={24} className="text-white" />
          </button>
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt={productItem.title}
              fill
              className="object-contain rounded-xl"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
