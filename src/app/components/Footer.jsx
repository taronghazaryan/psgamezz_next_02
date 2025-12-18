import Image from "next/image";
import { FaTelegramPlane, FaYoutube, FaVk } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative mt-auto w-full bg-[#1a1b26] border-t border-white/10 shadow-lg">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Image
              src="/logo/1.png"
              alt="PSGamezz Logo"
              width={140}
              height={44}
              className="mb-2"
            />
            <p className="text-white/80 text-base leading-relaxed max-w-md">
              Выдаём заказы с 10:00 до 23:00 (МСК)
            </p>
            <div className="h-px bg-white/20 w-full my-2"></div>
            <p className="text-white/60 text-sm">
              © 2025 psgamezz.ru Все права защищены.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-lg mb-2">Соц.сети</h4>
            <div className="flex gap-4">
              <a
                href="https://t.me/psgamezz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/10 hover:bg-[#6366f1]/30 flex items-center justify-center transition-all duration-200 hover:scale-110 border border-white/10"
                aria-label="Telegram"
              >
                <FaTelegramPlane className="text-white text-xl" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/10 hover:bg-red-500/30 flex items-center justify-center transition-all duration-200 hover:scale-110 border border-white/10"
                aria-label="YouTube"
              >
                <FaYoutube className="text-white text-xl" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-white/10 hover:bg-blue-500/30 flex items-center justify-center transition-all duration-200 hover:scale-110 border border-white/10"
                aria-label="VKontakte"
              >
                <FaVk className="text-white text-xl" />
              </a>
            </div>
            <div className="mt-4">
              <h4 className="text-white font-bold text-lg mb-2">Напиши нам</h4>
              <a
                href="mailto:support@psgamezz.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors duration-200 text-sm"
              >
                support@psgamezz.ru
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-lg mb-2">Сервисы</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm block"
                >
                  Покупка игровых аккаунтов
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm block"
                >
                  Пополнение аккаунта
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm block"
                >
                  Покупка подписок аккаунта
                </a>
              </li>
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm block"
                >
                  Покупка игр
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold text-lg mb-2">Покупателям</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm block"
                >
                  Поддержка
                </a>
              </li>
              <li>
                <a
                  href="https://disk.yandex.ru/i/b8Up-MiVGcM-Og"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm block"
                >
                  Оферта
                </a>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="text-white font-bold text-lg mb-2">Работать с нами</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-[#f59e0b] transition-colors duration-200 text-sm block"
                  >
                    Если ты специалист
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-[#f59e0b] transition-colors duration-200 text-sm block"
                  >
                    Если ты блогер
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-[#f59e0b] transition-colors duration-200 text-sm block"
                  >
                    Партнёрство
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
