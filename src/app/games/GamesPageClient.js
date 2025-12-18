"use client";

import { useState } from "react";
import AllGames from "../components/Games/AllGames";
import Main from "../components/Games/Main";
import Sales from "../components/Games/Sales";

export default function GamesPage() {
  const tabs = ["Главная", "Все игры", "Скидки"];
  const [activeTab, setActiveTab] = useState("Главная");

  return (
    <div className="min-h-screen bg-[#0d0e14]">
      <div className="bg-[#1a1b26] border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex justify-center gap-2 md:gap-4 py-6 md:py-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-8 md:px-12 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg lg:text-xl transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-[#6366f1] text-white shadow-lg scale-105"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="py-8 md:py-12 bg-[#0d0e14]">
        {activeTab === "Главная" && <Main />}
        {activeTab === "Все игры" && <div className="px-4 md:px-6 lg:px-8"><AllGames /></div>}
        {activeTab === "Скидки" && <div className="px-4 md:px-6 lg:px-8"><Sales /></div>}
      </div>
    </div>
  );
}
