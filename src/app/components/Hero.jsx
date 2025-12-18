"use client";

import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const handleScroll = () => {
    const target = document.getElementById("reviews");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0d0e14]">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage: `url(/spiderman.jpg)`,
        }}
      ></div>
      <div className="absolute inset-0 bg-[#0d0e14]/80"></div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-32 lg:py-40">
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-montserrat leading-tight mb-6 md:mb-8">
            <span className="text-white">Всё для вашей</span>
            <br />
            <span className="text-[#6366f1] inline-block">
              PlayStation
            </span>
            <br />
            <span className="text-white">без головной боли</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 md:mb-16 max-w-3xl mx-auto">
            Более 5000 игр и подписок по лучшим ценам. Быстро, безопасно, надежно.
          </p>

          <div className="bg-[#1e1f2e] rounded-3xl p-8 md:p-12 mb-12 md:mb-16 max-w-2xl mx-auto border border-white/10 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="text-4xl md:text-5xl font-black text-[#6366f1] mb-2">
                  10,000+
                </div>
                <p className="text-lg md:text-xl text-white/90 font-semibold mb-1">
                  Довольных пользователей
                </p>
                <p className="text-white/70">
                  постоянно играют с нами
                </p>
              </div>
              <button 
                onClick={handleScroll} 
                className="bg-[#6366f1] hover:bg-[#5555e0] text-white px-8 py-4 rounded-2xl text-lg md:text-xl font-bold w-full md:w-auto transition-all duration-200 hover:scale-105"
              >
                Прочитать отзывы
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <div className="bg-[#1e1f2e] rounded-3xl p-8 md:p-10 border border-white/10 shadow-xl hover:border-[#6366f1]/50 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-20 h-20 md:w-24 md:h-24 mb-6 rounded-2xl bg-[#6366f1] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-12 h-12 md:w-14 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                  Игры не кончаются
                </h3>
                <p className="text-white/80 text-lg mb-8 flex-grow">
                  Свыше 5188 игр в коллекции
                </p>
                <Link
                  href="/games"
                  className="bg-[#6366f1] hover:bg-[#5555e0] text-white px-8 py-4 rounded-2xl text-lg md:text-xl font-bold w-full transition-all duration-200 hover:scale-105"
                >
                  Смотреть игры
                </Link>
              </div>
            </div>

            <div className="bg-[#1e1f2e] rounded-3xl p-8 md:p-10 border border-white/10 shadow-xl hover:border-[#f59e0b]/50 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center h-full">
                <div className="w-20 h-20 md:w-24 md:h-24 mb-6 rounded-2xl bg-[#f59e0b] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-12 h-12 md:w-14 md:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                  Подписки PS Plus
                </h3>
                <p className="text-white/80 text-lg mb-8 flex-grow">
                  и EA Play по низкой цене
                </p>
                <Link 
                  href="/subscription" 
                  className="bg-[#f59e0b] hover:bg-[#e68a00] text-white px-8 py-4 rounded-2xl text-lg md:text-xl font-bold w-full transition-all duration-200 hover:scale-105"
                >
                  Подключить
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
