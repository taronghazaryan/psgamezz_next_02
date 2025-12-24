"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import Card from "../Card";
import { fetchGamesPage } from "../../../api/games";
import SideBAR from "./Sidebar";

const getDefaultFilters = () => ({
  platform: { ps5: false, ps4: false },
  genre: { roleplay: false, action: false, adventure: false },
  priceRange: { min: "", max: "" },
  withDiscount: false,
  localization: { russianVoice: false, russianSubtitles: false },
  activation: { withActivation: false, withoutActivation: false },
});

export default function AllGames() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Популярные");
  const [filters, setFilters] = useState(getDefaultFilters());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [games, setGames] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadingRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFilters = sessionStorage.getItem("gameFilters");
      if (storedFilters) setFilters(JSON.parse(storedFilters));
    }

    const loadFirstPage = async () => {
      try {
        const { results, next } = await fetchGamesPage();
        setGames(results);
        setNextPageUrl(next);
      } catch (e) {
        console.error("Ошибка загрузки игр:", e);
      }
    };

    loadFirstPage();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("gameFilters", JSON.stringify(filters));
    }
  }, [filters]);

  const filterProducts = useCallback((productsToFilter, currentFilters) => {
    return productsToFilter.filter((product) => {
      const selectedPlatforms = Object.entries(currentFilters.platform)
        .filter(([, value]) => value)
        .map(([key]) => key.toUpperCase());

      if (
        selectedPlatforms.length &&
        !selectedPlatforms.some((p) => product.consoles?.includes(p))
      )
        return false;

      const selectedGenres = Object.entries(currentFilters.genre)
        .filter(([, value]) => value)
        .map(([key]) => key);

      if (
        selectedGenres.length &&
        !selectedGenres.some((genre) =>
          product.categories?.includes(genre)
        )
      )
        return false;

      const activationKeys = [];
      if (currentFilters.activation.withActivation)
        activationKeys.push("with_activation");
      if (currentFilters.activation.withoutActivation)
        activationKeys.push("without_activation");

      if (
        activationKeys.length &&
        !activationKeys.some((key) => product.prices?.[key]?.length)
      )
        return false;

      const allPrices = activationKeys.length
        ? activationKeys.flatMap((key) => product.prices?.[key] || [])
        : [
            ...(product.prices?.with_activation || []),
            ...(product.prices?.without_activation || []),
          ];

      const priceValues = allPrices
        .map((entry) => {
          const platform = Object.keys(entry).find(
            (key) => key === "PS4" || key === "PS5"
          );
          const price = entry?.[platform];
          const discount = entry?.sale_amount || 0;
          return typeof price === "number" ? price - discount : null;
        })
        .filter((val) => typeof val === "number");

      const minPrice = currentFilters.priceRange.min
        ? parseFloat(currentFilters.priceRange.min)
        : null;
      const maxPrice = currentFilters.priceRange.max
        ? parseFloat(currentFilters.priceRange.max)
        : null;

      if (
        (minPrice !== null || maxPrice !== null) &&
        !priceValues.some(
          (price) =>
            (minPrice === null || price >= minPrice) &&
            (maxPrice === null || price <= maxPrice)
        )
      )
        return false;

      if (currentFilters.withDiscount) {
        if (!allPrices.some((e) => (e.sale_amount || 0) > 0)) return false;
      }

      const hasRussianVoice = Object.values(product.voice_acting || {}).some(
        (arr) => Array.isArray(arr) && arr.includes("ru")
      );
      const hasRussianSubs = Object.values(product.subtitle || {}).some(
        (arr) => Array.isArray(arr) && arr.includes("ru")
      );

      if (currentFilters.localization.russianVoice && !hasRussianVoice)
        return false;
      if (
        currentFilters.localization.russianSubtitles &&
        !hasRussianSubs
      )
        return false;

      return true;
    });
  }, []);

  const filteredProducts = useMemo(() => {
    return filterProducts(games, filters);
  }, [games, filters, filterProducts]);

  const loadMoreGames = async () => {
    if (!nextPageUrl || loadingRef.current) return;

    loadingRef.current = true;
    setLoadingMore(true);

    try {
      const { results, next } = await fetchGamesPage(nextPageUrl);
      setGames((prev) => [...prev, ...results]);
      setNextPageUrl(next);
    } catch (e) {
      console.error("Ошибка загрузки:", e);
    } finally {
      loadingRef.current = false;
      setLoadingMore(false);
    }
  };

  const handleCheckboxChange = (category, key) => {
    if (category === "discount") {
      setFilters((prev) => ({ ...prev, withDiscount: !prev.withDiscount }));
    } else if (category === "activation") {
      setFilters((prev) => ({
        ...prev,
        activation: { ...prev.activation, [key]: !prev.activation[key] },
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [category]: { ...prev[category], [key]: !prev[category][key] },
      }));
    }
  };

  const handlePriceChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: { ...prev.priceRange, [type]: value },
    }));
  };

  const resetFilters = () => {
    const freshFilters = getDefaultFilters();
    setFilters(freshFilters);
    sessionStorage.removeItem("gameFilters");
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setIsSelectOpen(false);
  };

  const activationType = filters.activation.withActivation
    ? "with_activation"
    : filters.activation.withoutActivation
    ? "without_activation"
    : "with_activation";


  return (
    <div className="w-full max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Desktop sidebar */}
        <div className="hidden md:block md:w-1/4">
          <SideBAR
            filters={filters}
            onCheckboxChange={handleCheckboxChange}
            onPriceChange={handlePriceChange}
            onReset={resetFilters}
            isMobile={false}
          />
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Верхний блок кнопок */}
          <div className="flex justify-between items-center mb-4">
            {/* Кнопка фильтров для мобильных */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden flex items-center border border-gray-300 gap-2 px-4 py-2 bg-[#1a1b26] text-white rounded-lg"
            >
              <SlidersHorizontal size={18} />
              Фильтры
            </button>

            {/* Сортировка */}
            <div className="relative inline-block gap-16">
              <button
                onClick={() => setIsSelectOpen(!isSelectOpen)}
                className="flex items-center border border-gray-300 px-4 py-2 rounded-lg bg-[#1a1b26] shadow-sm hover:shadow transition-shadow"
              >
                <span className="mr-2">{selectedType}</span>
                {isSelectOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {isSelectOpen && (
                <div className="absolute z-10 mt-2 w-full bg-[#1a1b26] border border-gray-300 rounded shadow-md">
                  {["Популярные", "По рейтингу", "Дешевле", "Дороже"].map(
                    (type) => (
                      <div
                        key={type}
                        className={`px-4 py-2 text-gray-300 cursor-pointer hover:white ${
                          selectedType === type ? "bg-gray-400 text-white" : ""
                        }`}
                        onClick={() => handleTypeSelect(type)}
                      >
                        {type}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Сетка карточек */}
          <div className="grid grid-cols-2 max-sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {filteredProducts.map((product, index) => (
              <Card
                key={`${product.id}-${index}`}
                {...product}
                activationType={activationType}
              />
            ))}
          </div>

          {nextPageUrl && (
            <div className="flex justify-center mb-6 mt-6">
              <button
                onClick={loadMoreGames}
                disabled={loadingMore}
                className="px-4 py-2 border boreder-white text-white rounded-[10px] hover:bg-slate-600"
              >
                {loadingMore ? "Загрузка..." : "Показать еще"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="bg-black/90 w-80 p-4 shadow-lg h-full overflow-y-auto">
            <SideBAR
              filters={filters}
              onCheckboxChange={handleCheckboxChange}
              onPriceChange={handlePriceChange}
              onReset={resetFilters}
              isMobile={true}
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>
          <div
            className="flex-1 bg-black/30 backdrop-blur-md transition-all duration-300"
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
      )}
  </div>
  );
}
