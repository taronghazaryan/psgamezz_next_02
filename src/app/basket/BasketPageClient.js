"use client";

import { useState, useEffect } from "react";
import { useBasket } from "../context/BasketContext";
import BasketItem from "../components/BasketItem";
import Api from "../connectors";
import { Trash2, X } from "lucide-react";
import Image from "next/image";

const BasketPageClient = () => {
  const { basket, removeSelected, removeFromBasket, toggleAll } = useBasket();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const overallPrice = basket.reduce(
    (sum, item) => sum + (item.price ?? 0) * (item.quantity ?? 1),
    0
  );

  const allChecked = basket.length > 0 && basket.every((item) => item.checked);

  const handleOrderClick = () => {
    if (basket.length === 0) {
      alert("Корзина пуста");
      return;
    }
    setIsModalOpen(true);
  };

  const redirectToPayment = (url) => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;
    document.body.appendChild(form);
    form.submit();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !username.trim()) {
      setError("Пожалуйста, заполните все обязательные поля");
      return;
    }

    setLoading(true);

    try {
      const { data } = await Api.post("/api/payment/initiate/", {
        email,
        username,
        items: basket,
      });

      if (!data.payment_url) throw new Error("Нет ссылки для оплаты");

      setIsModalOpen(false);
      redirectToPayment(data.payment_url);
      
    } catch (e) {
      setError(e.response?.data?.message || e.message || "Ошибка запроса");
      setLoading(false);
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/60 font-semibold text-lg">Загрузка...</div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen py-8 md:py-12 bg-[#0d0e14]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2">
              Корзина
            </h1>
            <p className="text-white/60 text-lg">
              {basket.length > 0 ? `${basket.length} товар${basket.length > 1 ? 'ов' : ''} в корзине` : 'Ваша корзина пуста'}
            </p>
          </div>

          {basket.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="premium-card rounded-2xl p-4 md:p-6 flex items-center justify-between border border-white/10">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={allChecked}
                      onChange={(e) => toggleAll(e.target.checked)}
                      className="h-5 w-5 md:h-6 md:w-6 accent-[#6366f1] cursor-pointer"
                    />
                    <span className="font-bold text-white text-lg md:text-xl group-hover:text-[#6366f1] transition-colors">
                      Выбрать все
                    </span>
                  </label>
                  <button
                    onClick={removeSelected}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl font-bold text-white text-sm md:text-base transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    Удалить выбранное
                  </button>
                </div>

                {basket.map((item, index) => (
                  <BasketItem key={index} item={item} index={index} />
                ))}
              </div>

              <div className="lg:sticky lg:top-8 h-fit">
                <div className="premium-card rounded-2xl lg:rounded-3xl p-6 md:p-8 border border-white/10">
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
                    Итого
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-white/80">
                      <span className="text-lg">Товары ({basket.length} шт.)</span>
                      <span className="font-semibold text-white">{overallPrice}₽</span>
                    </div>
                    <div className="h-px bg-white/10"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl md:text-2xl font-bold text-white">Итого</span>
                      <span className="text-2xl md:text-3xl font-black text-gradient-warm">
                        {overallPrice}₽
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleOrderClick}
                    className="bg-[#6366f1] hover:bg-[#5555e0] text-white w-full py-4 rounded-xl text-lg md:text-xl font-black transition-all duration-200 hover:scale-105 shadow-lg"
                  >
                    Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="premium-card rounded-3xl p-12 max-w-md mx-auto border border-white/10">
                <p className="text-white/60 text-xl mb-4">Корзина пуста</p>
                <a
                  href="/games"
                  className="bg-[#6366f1] hover:bg-[#5555e0] text-white inline-block px-8 py-4 rounded-xl text-lg font-bold transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  Перейти к играм
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 z-[9999999] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fade-in p-4'>
          <div className='relative premium-card text-white w-full max-w-2xl rounded-3xl shadow-xl border border-white/10 animate-fade-in max-h-[90vh] overflow-y-auto'>
            <button
              onClick={() => setIsModalOpen(false)}
              className='absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-200 hover:scale-110 z-10'
            >
              <X size={24} className="text-white" />
            </button>

            <div className='p-6 md:p-8'>
              <h2 className='text-3xl md:text-4xl font-black mb-2'>Ваш заказ</h2>
              <p className='text-white/60 text-lg mb-6'>
                Сумма: <span className='text-gradient-warm font-bold text-xl'>{overallPrice}₽</span>
              </p>

              <div className='h-px bg-white/10 mb-6'></div>

              <div className='space-y-3 mb-6 max-h-[200px] overflow-y-auto scrollbar-hide'>
                {basket.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 premium-card rounded-xl p-3 border border-white/10"
                  >
                    <Image
                      src={item.main_image_url || item.img}
                      alt={item.title}
                      width={60}
                      height={80}
                      className="w-15 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate">{item.title}</p>
                      <p className="text-white/60 text-sm">{item.price}₽ × {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => removeFromBasket(index)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-all"
                    >
                      <Trash2 size={18} className="text-red-400" />
                    </button>
                  </div>
                ))}
              </div>

              <div className='space-y-4 mb-6'>
                <div>
                  <label className='text-white text-lg font-semibold mb-2 block'>Ваша почта</label>
                  <input
                    type='email'
                    placeholder='example@mail.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl placeholder:text-white/40 text-white focus:outline-none focus:border-[#6366f1] focus:bg-white/10 transition-all'
                  />
                </div>
                <div>
                  <label className='text-white text-lg font-semibold mb-2 block'>Ваше имя</label>
                  <input
                    type='text'
                    placeholder='Ваше имя'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl placeholder:text-white/40 text-white focus:outline-none focus:border-[#6366f1] focus:bg-white/10 transition-all'
                  />
                </div>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 rounded-xl text-lg font-bold text-white bg-white/10 hover:bg-white/20 transition-all duration-200"
                >
                  Закрыть
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-[#6366f1] hover:bg-[#5555e0] text-white py-4 rounded-xl text-lg font-black transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? "Обработка..." : "Купить"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BasketPageClient;
