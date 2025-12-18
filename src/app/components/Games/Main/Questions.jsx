"use client";

import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function Questions() {
	const [openIndex, setOpenIndex] = useState(null);
	const questions = [
		{
			question: 'Что такое "с активацией"?',
			answer: `Вы получаете логин и пароль от игрового аккаунта.

Далее добавляете его на консоль, включаете активацию аккаунта (общий доступ) в настройках по инструкции.

После ставите игру на установку, и она появляется на вашем аккаунте любого региона.

В этом варианте покупки игра передается на ваш аккаунт благодаря игровому аккаунту. Вы получаете купленную вами игру на ваш аккаунт любого региона.`,
		},
		{
			question: 'Что такое "без активации"?',
			answer: `Вы получаете логин и пароль от игрового аккаунта.

Далее добавляете его на консоль, не активируете(общий доступ), и ставите игру на установку по инструкции.

После завершения установки играете на игровом аккаунте.

В этом варианте покупки игра будет доступна только на игровом аккаунте. И вы сможете играть в купленную игру.`,
		},
		{
			question: 'После оплаты. Как получить заказ?',
			answer: `После оплаты игры вы получите код заказа, который дублируется на вашу почту.

Код необходимо отправить в нашу поддержку для получения игрового аккаунта.

К игровому аккаунту предоставляем все необходимые инструкции, и помогаем с установкой.`,
		},
		{
			question: 'Что делать если РФ аккаунт?',
			answer: 'Аккаунт любого региона подойдет.',
		},
	];
	return (
		<div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 bg-[#0d0e14]">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20">
				<div className='flex flex-col justify-self-start gap-2.5 py-4'>
					<h1 className='text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6 md:mb-8'>
						Возникли вопросы?
					</h1>
					{questions.map((item, index) => {
						const isOpen = openIndex === index;
						return (
							<div key={index} className="mb-4">
								<div className='flex items-center justify-between gap-2 premium-card rounded-xl p-4 premium-card-hover border border-white/10'>
									<p className='text-white font-bold text-base md:text-lg leading-5 flex-1'>
										{item.question}
									</p>
									<button
										onClick={() => {
											setOpenIndex(isOpen ? null : index);
										}}
										className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#6366f1]/20 hover:bg-[#6366f1]/30 flex items-center justify-center transition-all duration-200"
									>
										{isOpen ? (
											<ChevronUp className='w-6 h-6 text-[#6366f1]' />
										) : (
											<ChevronDown className='w-6 h-6 text-white' />
										)}
									</button>
								</div>
								<div
									className={`transition-all duration-300 overflow-hidden ${
										isOpen ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
									}`}
								>
									<div className='premium-card py-4 px-5 rounded-2xl border border-white/10'>
										<p className='text-white/90 text-sm md:text-base leading-relaxed whitespace-pre-line'>
											{item.answer}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<div className='flex flex-col items-center justify-center premium-card rounded-3xl gap-6 px-8 md:px-14 py-8 md:py-12 text-center border border-white/10'>
					<h3 className='text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight'>
						Более 10 000 геймеров воспользовались для покупки игры нашими сервисами
					</h3>
					<button 
						onClick={() => {
							const target = document.getElementById("reviews");
							if (target) target.scrollIntoView({ behavior: "smooth" });
						}}
						className='premium-button px-12 py-4 rounded-xl text-lg md:text-xl font-black hover:scale-105 transition-transform duration-300'
					>
						Прочитать отзывы
					</button>
				</div>
			</div>
		</div>
	);
}
