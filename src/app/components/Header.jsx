"use client";

import { useState, useEffect, useRef } from "react";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useBasket } from "../context/BasketContext";
import { searchGames } from "../api/games";

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { basket } = useBasket();
  const totalItems = basket.reduce((sum, item) => sum + (item.quantity ?? 1), 0);
  const menuRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchGames(query);
        setResults(data.results || []);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [query]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelectGame = (game) => {
    localStorage.setItem("lastClickedProductId", game.id);
    setQuery("");
    setMobileSearchOpen(false);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) setMobileSearchOpen(false);
  };

  const toggleSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
    if (!mobileSearchOpen) setMenuOpen(false);
  };

  return (
    // <header className="sticky top-0 z-50 w-full bg-[#1a1b26] border-b border-white/10 shadow-lg"></header>
    <header className="relative z-50 w-full bg-[#1a1b26] border-b border-white/10 shadow-lg">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          <button
            className="lg:hidden p-3 rounded-xl hover:bg-white/10 transition-all duration-200 text-white"
            onClick={toggleMenu}
            aria-label="Меню"
          >
            {menuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>

          <Link 
            href="/" 
            onClick={() => setMenuOpen(false)}
            className="flex-shrink-0 hover:opacity-90 transition-opacity duration-200"
          >
            <Image
              className="h-12 w-auto md:h-16 lg:h-20"
              src="/logo/1.png"
              alt="PSGamezz Logo"
              width={160}
              height={96}
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
            <Link 
              href="/games" 
              className={`relative px-6 py-3 rounded-xl font-semibold text-sm xl:text-base transition-all duration-300 ${
                pathname === "/games" 
                  ? "bg-[#6366f1] text-white" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <Image
                  className="h-5 w-5"
                  src={pathname === "/games" ? "/logo/3blue.png" : "/logo/3.png"}
                  alt="Игры"
                  width={20}
                  height={20}
                />
                <span>Игры</span>
              </div>
            </Link>

            <Link 
              href="/subscription" 
              className={`relative px-6 py-3 rounded-xl font-semibold text-sm xl:text-base transition-all duration-300 ${
                pathname === "/subscription" 
                  ? "bg-[#f59e0b] text-white" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <Image
                  className="h-5 w-5"
                  src={pathname === "/subscription" ? "/logo/2yellow.png" : "/logo/2.png"}
                  alt="Подписки"
                  width={20}
                  height={20}
                />
                <span>Подписки</span>
              </div>
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <IoSearch className="text-white/40 text-lg" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск игр..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#6366f1] focus:bg-white/15 focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-200"
              />
              {query && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#252732] rounded-xl shadow-xl border border-white/10 max-h-[400px] overflow-y-auto z-50">
                  {loading ? (
                    <div className="p-4 text-center text-white/60">Загрузка...</div>
                  ) : results.length > 0 ? (
                    <div className="p-2">
                      {results.map((game) => (
                        <Link
                          key={game.id}
                          href={`/games/${game.slug}`}
                          className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
                          onClick={() => handleSelectGame(game)}
                        >
                          <Image
                            src={game.main_image_url}
                            alt={game.title}
                            width={60}
                            height={80}
                            className="w-15 h-20 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform duration-200"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white group-hover:text-[#6366f1] transition-colors truncate">{game.title}</p>
                            <p className="text-sm text-white/60">
                              от {game.prices?.without_activation?.[0]?.PS4 || game.prices?.without_activation?.[0]?.PS5 || "—"} ₽
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-white/60">Ничего не найдено</div>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            className="lg:hidden p-3 rounded-xl hover:bg-white/10 transition-all duration-200 text-white"
            onClick={toggleSearch}
            aria-label="Поиск"
          >
            <IoSearch size={24} />
          </button>

          <Link 
            href="/basket" 
            onClick={() => setMenuOpen(false)}
            className="relative flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 group"
          >
            <div className="relative">
              <Image
                className="h-6 w-6 md:h-7 md:w-7"
                src="/logo/5.png"
                alt="Корзина"
                width={28}
                height={28}
              />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center min-w-[20px] h-5 px-1.5 shadow-lg">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="hidden xl:inline font-semibold text-white/90 group-hover:text-white">Корзина</span>
          </Link>
        </div>
      </div>

      {mobileSearchOpen && (
        <div className="lg:hidden border-t border-white/10 px-4 py-4 animate-fade-in bg-[#1a1b26]">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <IoSearch className="text-white/40" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Поиск игр..."
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#6366f1] focus:bg-white/15 focus:ring-2 focus:ring-[#6366f1]/20 transition-all duration-200"
            />
            {query && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#252732] rounded-xl shadow-xl border border-white/10 max-h-[300px] overflow-y-auto z-50">
                {loading ? (
                  <div className="p-3 text-center text-white/60 text-sm">Загрузка...</div>
                ) : results.length > 0 ? (
                  <div className="p-2">
                    {results.map((game) => (
                      <Link
                        key={game.id}
                        href={`/games/${game.slug}`}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-all"
                        onClick={() => handleSelectGame(game)}
                      >
                        <Image
                          src={game.main_image_url}
                          alt={game.title}
                          width={50}
                          height={66}
                          className="w-12 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-white text-sm truncate">{game.title}</p>
                          <p className="text-xs text-white/60">
                            от {game.prices?.without_activation?.[0]?.PS4 || game.prices?.without_activation?.[0]?.PS5 || "—"} ₽
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 text-center text-white/60 text-sm">Ничего не найдено</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {menuOpen && (
        <div
          ref={menuRef}
          className="lg:hidden border-t border-white/10 bg-[#1a1b26] animate-fade-in"
        >
          <nav className="flex flex-col py-4">
            <Link 
              href="/" 
              onClick={() => setMenuOpen(false)} 
              className="px-6 py-4 text-white font-semibold hover:bg-white/10 hover:text-[#6366f1] transition-all duration-200"
            >
              Главная
            </Link>
            <Link 
              href="/games" 
              onClick={() => setMenuOpen(false)} 
              className="px-6 py-4 text-white font-semibold hover:bg-white/10 hover:text-[#6366f1] transition-all duration-200"
            >
              Игры
            </Link>
            <Link 
              href="/subscription" 
              onClick={() => setMenuOpen(false)} 
              className="px-6 py-4 text-white font-semibold hover:bg-white/10 hover:text-[#f59e0b] transition-all duration-200"
            >
              Подписки
            </Link>
            <Link 
              href="/basket" 
              onClick={() => setMenuOpen(false)} 
              className="px-6 py-4 text-white font-semibold hover:bg-white/10 hover:text-[#6366f1] transition-all duration-200"
            >
              Корзина
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
