"use client";

import Link from "next/link";

const Section2 = () => {
  return (
    <section className="relative w-full py-16 md:py-20 lg:py-24 bg-[#0d0e14]">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4">
            Мы создаем рай для геймеров
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
            Все необходимое для вашей PlayStation в одном месте
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <Link href="https://t.me/psgamezz" className="group">
            <div className="premium-card rounded-3xl p-8 md:p-10 premium-card-hover h-full flex flex-col items-center text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 mb-6 rounded-2xl premium-gradient flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                Игровые аккаунты
              </h3>
              <p className="text-white/70 text-lg">
                Покупка игровых аккаунтов с играми
              </p>
            </div>
          </Link>

          <Link href="https://t.me/psgamezz" className="group">
            <div className="premium-card rounded-3xl p-8 md:p-10 premium-card-hover h-full flex flex-col items-center text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 mb-6 rounded-2xl premium-gradient-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                Пополнение кошелька
              </h3>
              <p className="text-white/70 text-lg">
                Быстрое пополнение PSN кошелька
              </p>
            </div>
          </Link>

          <Link href="/subscription#eaplay" className="group">
            <div className="premium-card rounded-3xl p-8 md:p-10 premium-card-hover h-full flex flex-col items-center text-center border-2 border-[#ef4444]/30">
              <div className="w-20 h-20 md:w-24 md:h-24 mb-6 rounded-2xl premium-gradient-warm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                EA Play
              </h3>
              <p className="text-white/70 text-lg">
                Подписка на коллекцию игр EA
              </p>
            </div>
          </Link>

          <Link href="/subscription#psplus" className="group">
            <div className="premium-card rounded-3xl p-8 md:p-10 premium-card-hover h-full flex flex-col items-center text-center border-2 border-[#f59e0b]/30">
              <div className="w-20 h-20 md:w-24 md:h-24 mb-6 rounded-2xl premium-gradient-warm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                PS Plus
              </h3>
              <p className="text-white/70 text-lg">
                Подписка PlayStation Plus
              </p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Section2;
