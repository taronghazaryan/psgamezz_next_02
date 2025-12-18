"use client";

export default function SubscriptionHero() {
  const handleScroll = () => {
    const target = document.getElementById("subscriptions");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-[#0d0e14]">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: `url(/fifa.jpg)`,
        }}
      ></div>
      <div className="absolute inset-0 bg-[#0d0e14]/90"></div>

      <div className="relative z-10 min-h-[600px] md:min-h-[700px] lg:min-h-[800px]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 h-full flex items-center py-20 md:py-32">
          <div className="w-full">
            <div className="text-center mb-12 md:mb-16 animate-fade-in">
              <div className="inline-block mb-6">
                <span className="text-2xl md:text-3xl font-bold text-[#6366f1] bg-[#6366f1]/20 px-6 py-2 rounded-full border border-[#6366f1]/30">
                  PlayStation Plus
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-6 md:mb-8 leading-tight drop-shadow-2xl">
                Подписки для
                <br />
                <span className="text-[#6366f1] inline-block">
                  настоящих геймеров
                </span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
                Получите доступ к сотням игр, эксклюзивным скидкам и онлайн-мультиплееру по лучшим ценам на рынке
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
              <div className="bg-[#1e1f2e] rounded-3xl p-6 md:p-8 border border-white/10 text-center hover:border-[#6366f1]/50 transition-all duration-300">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-2xl bg-[#6366f1] flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                  Сотни игр
                </h3>
                <p className="text-white/70 text-base md:text-lg">
                  Доступ к огромной библиотеке игр
                </p>
              </div>

              <div className="bg-[#1e1f2e] rounded-3xl p-6 md:p-8 border border-white/10 text-center hover:border-[#8b5cf6]/50 transition-all duration-300">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-2xl bg-[#8b5cf6] flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                  Эксклюзивные скидки
                </h3>
                <p className="text-white/70 text-base md:text-lg">
                  Специальные предложения только для подписчиков
                </p>
              </div>

              <div className="bg-[#1e1f2e] rounded-3xl p-6 md:p-8 border border-white/10 text-center hover:border-[#6366f1]/50 transition-all duration-300">
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-2xl bg-[#6366f1] flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">
                  Онлайн-мультиплеер
                </h3>
                <p className="text-white/70 text-base md:text-lg">
                  Играйте с друзьями по всему миру
                </p>
              </div>
            </div>

            <div className="text-center animate-fade-in">
              <button 
                onClick={handleScroll} 
                className="bg-[#6366f1] hover:bg-[#5555e0] text-white px-12 md:px-16 py-5 md:py-6 rounded-2xl text-xl md:text-2xl lg:text-3xl font-black shadow-2xl hover:scale-105 transition-transform duration-300"
              >
                Подключить подписку
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
