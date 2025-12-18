"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useBasket } from "../context/BasketContext";
import HowToUse from "./howtouse";

export default function PlayStationPlusDesign({ subscriptions, consoleTypes }) {
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [psType, setPsType] = useState(null);
  const { basket, addToBasket } = useBasket();

  const availableConsoles = consoleTypes.filter(consoleItem =>
    subscriptions.some(sub => sub.consoles.includes(consoleItem.id))
  );

  useEffect(() => {
    if (!psType && availableConsoles.length > 0) {
      setPsType(availableConsoles[0].name);
    }
  }, [availableConsoles, psType]);

  const durations = subscriptions
    .filter(sub =>
      sub.consoles.includes(
        availableConsoles.find(c => c.name === psType)?.id
      )
    )
    .flatMap(sub =>
      sub.periods.map(period => ({
        id: period.id,
        value: String(period.months),
        label: `${period.months} мес.`,
        price: Number(period.price),
      }))
    );

  useEffect(() => {
    if (durations.length > 0 && !selectedDuration) {
      setSelectedDuration(durations[0].value);
    }
  }, [durations, selectedDuration]);

  const features = [
    {
      title: "Больше игр",
      text: "В коллекцию The Play List входят более 50 игр из ваших любимых франшиз вроде Need for Speed, Madden и Battlefield."
    },
    {
      title: "Пробные версии игр",
      text: "Играйте в избранные новинки от EA в течение 10 часов."
    },
    {
      title: "Больше наград",
      text: "Подписчики получают эксклюзивные награды, которые расширят границы игры и помогут выделиться."
    },
    {
      title: "Экономьте",
      text: "Получите скидку 10% на цифровые материалы EA, включая игры, внутриигровую валюту и многое другое."
    },
  ];

  const questions = [
    {
      question: "Как подключается подписка?",
      answer: "Наш менеджер Службы Заботы выдаст Вам логин и пароль от игрового аккаунта, который необходимо активировать по инструкции, после чего подписка начнёт работать на всех аккаунтах вашей консоли."
    },
    {
      question: "Как активировать подписку для РФ аккаунта?",
      answer: "После подключения выбранной вами подписки на аккаунт Ук. или Турецкого региона, чтобы PS Plus начала работать на РФ аккаунте необходимо активировать как основной (включить общий доступ) аккаунт с подпиской. После этого подписка PS Plus начнет работать на РФ аккаунте!"
    },
    {
      question: 'Что такое "PlayStation Plus на год в сплит"?',
      answer: "Способ подключения подписки или игры при помощи игрового аккаунта. Наш игровой аккаунт позволяет уменьшить стоимость выбранной подписки, сохраняя все возможности PS Plus без изменений."
    },
    {
      question: "Какая подписка подходит для онлайн игры?",
      answer: "Все виды подписки PS Plus включают в себя доступ к онлайн игре. Подписка EA Play НЕ предоставляет такой возможности, по ней доступна только коллекция игр от издателя Electronic Arts."
    },
    {
      question: "После оплаты. Как получить заказ?",
      answer: "После оплаты игры вы получите код заказа, который дублируется на вашу почту. Код необходимо отправить в нашу поддержку для получения игрового аккаунта. К игровому аккаунту предоставляем все необходимые инструкции, и помогаем с установкой."
    },
  ];

  const isInBasket = (durationId, ps) =>
    basket.some(item => item.id === durationId && item.psType === ps);

  const handleAddToBasket = (durationObj, ps) => {
    const sub = subscriptions.find(
      s =>
        s.consoles.includes(consoleTypes.find(c => c.name === ps)?.id) &&
        s.periods.some(p => p.id === durationObj.id)
    );
    if (!sub) return;

    const period = sub.periods.find(p => p.id === durationObj.id);
    if (!period) return;
    if (isInBasket(period.id, ps)) return;

    addToBasket({
      checked: false,
      console_id: sub.consoles.find(id => consoleTypes.find(c => c.id === id)?.name === ps),
      id: period.id,
      img: "/img/controller.png",
      level: sub.level,
      period_id: period.id,
      price: Number(period.price),
      product_type: "subscription_service",
      psType: ps,
      quantity: 1,
      service_id: sub.id,
      title: `Ea Play — ${period.months} мес. (${ps})`,
      description: sub.description,
    });
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto">
      <div className="py-6 max-sm:px-4 max-sm:py-4 overflow-hidden">
        <h1 className="xl:text-4xl md:text-3xl font-[900] max-sm:text-[15px] font-bold text-white mb-8 max-sm:mb-2">
          Как пользоваться?
        </h1>
        <HowToUse />

        {/* Main block */}
        <div className="flex flex-col lg:flex-row gap-8 mt-[100px] mb-12.5 max-sm:py-4 max-sm:mb-7.5 max-sm:mt-0 max-sm:gap-2.5" id="eaplay">
          <div className="bg-[#1e1f2e] rounded-3xl p-8 border border-white/10 shadow-xl flex-shrink-0">
            <Image
              src="/img/eaplay.png"
              alt="EA Play"
              className="rounded-3xl md:w-[420px] md:h-auto xl:w-[400px] xl:h-[400px] sm:h-full max-sm:w-full max-sm:h-[150px] object-cover"
              width={400}
              height={400}
            />
          </div>

          {/* Card */}
          <div className="grid grid-cols-2 max-md:grid-cols-1 max-sm:grid-cols-1 gap-x-8 gap-y-2.5 bg-[#1e1f2e] rounded-3xl border border-white/10 p-8 max-md:p-6 max-sm:p-4 flex-1 shadow-xl">
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="xl:text-4xl md:text-3xl font-[900] text-left text-white mb-1 max-sm:text-base">
                  EA Play
                </h2>
                <div className="flex items-center text-white/70 text-sm max-sm:text-[10px] gap-1">
                  <Image
                    src="/img/ElectronicArts.png"
                    alt="Electronic Arts"
                    className="w-13 h-4 max-sm:w-7.5 max-sm:h-2.5"
                    width={52}
                    height={16}
                  />
                  <span>Игры по подписке</span>
                </div>
              </div>

              {/* Console selection */}
              <div className="mb-1">
                <h3 className="xl:text-xl md:text-xl max-sm:text-sm text-left font-[600] text-white/90 mb-1">
                  Консоль
                </h3>
                <div className="flex gap-3">
                  {availableConsoles.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setPsType(c.name)}
                      className={`px-4 py-1 border border-white/20 rounded-lg font-[900] max-md:text-sm max-sm:text-[12px] cursor-pointer transition-all duration-200 ${
                        psType === c.name
                          ? "bg-[#6366f1] text-white border-[#6366f1]"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-2">
              <h3 className="xl:text-xl md:text-xl max-sm:text-sm text-left font-semibold text-white/90">
                Длительность подписки
              </h3>
              <div className="flex flex-col gap-2.5">
                {durations.map(duration => (
                  <button
                    key={duration.id}
                    onClick={() => setSelectedDuration(duration.value)}
                    className={`w-full p-2 text-sm max-sm:text-xs rounded-lg border transition-colors flex justify-between items-center ${
                      selectedDuration === duration.value
                        ? "bg-[#6366f1] text-white border-[#6366f1]"
                        : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-sm border flex items-center justify-center ${
                        selectedDuration === duration.value
                          ? "border-white bg-[#6366f1]"
                          : "border-white/40 bg-white/10"
                      }`}>
                        <span className={`text-sm font-bold max-sm:text-xs ${
                          selectedDuration === duration.value
                            ? "text-white"
                            : "text-white/70"
                        }`}>
                          {duration.value}
                        </span>
                      </span>
                      <span className="font-medium">{duration.label}</span>
                    </div>
                    <span className="font-bold text-[15px]">
                      {duration.price}₽
                    </span>
                  </button>
                ))}
              </div>

              {durations.map(duration => {
                if (duration.value === selectedDuration) {
                  const inBasket = isInBasket(duration.id, psType);
                  return (
                    <button
                      key={duration.id}
                      disabled={inBasket}
                      onClick={() => handleAddToBasket(duration, psType)}
                      className={`w-full ${
                        inBasket
                          ? "bg-white/20 cursor-not-allowed text-white/50"
                          : "bg-[#ef4444] hover:bg-[#dc2626] text-white"
                      } font-[600] py-2 rounded-lg text-lg max-sm:text-sm transition-colors cursor-pointer`}
                    >
                      {inBasket ? "В корзине" : "В корзину"}
                    </button>
                  );
                }
                return null;
              })}
            </div>

            {/* Features */}
            <div className="col-span-2 max-sm:col-span-1">
              <h3 className="xl:text-[16px] md:text-[14px] text-left font-[600] text-white/90 mb-3">
                Преимущества EA Play
              </h3>
              <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-3 max-sm:grid-cols-1 max-sm:gap-1">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col rounded-[10px] p-3 bg-white/10 border border-white/10"
                  >
                    <p className="text-[16px] text-white font-[700] max-sm:text-[9px] mb-2">
                      {feature.title}
                    </p>
                    <p className="text-[14px] font-normal text-white/80 max-sm:text-[9px]">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="w-full max-w-[1400px] mx-auto px-4">
          <h3 className="xl:text-4xl md:text-3xl max-sm:text-[15px] font-bold text-white mb-3">
            Часто задаваемые вопросы:
          </h3>
          <div className="flex flex-wrap gap-x-10 gap-y-4 max-sm:gap-3">
            {questions.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="w-full sm:w-[48%] flex flex-col gap-2 max-sm:gap-1"
                >
                  <div className="flex items-center gap-2 bg-[#1e1f2e] p-3 rounded-lg border border-white/10">
                    <p className="text-white xl:text-[16px] md:text-[16px] font-semibold leading-5 max-sm:text-xs max-sm:font-bold flex-1">
                      {item.question}
                    </p>
                    <button
                      className={`flex items-center justify-center px-3 py-1 text-lg border rounded-sm cursor-pointer max-sm:w-4 max-sm:h-3 max-sm:rounded-xs max-sm:text-sm max-sm:pb-0.5 max-sm:px-0 transition-all duration-200 ${
                        isOpen ? "bg-[#6366f1] text-white border-[#6366f1]" : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                      }`}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                    >
                      {isOpen ? "-" : "+"}
                    </button>
                  </div>
                  <div
                    className={`transition-all duration-500 overflow-hidden ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-[#1e1f2e] py-2 px-2.5 rounded-2xl mt-2 max-sm:rounded-lg max-sm:py-1.5 max-sm:mt-1.5 border border-white/10">
                      <p className="text-white xl:text-[16px] md:text-[14px] max-sm:text-xs max-sm:font-bold">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
