import { FaqService } from 'src/helpers/faq/faq.service';

interface IWelcomeMessageArgs {
  username: string;
  faqService: FaqService;
}

export const WELCOME_MESSAGE = (args: IWelcomeMessageArgs) => {
  const { username, faqService } = args;
  const faq = faqService.faq;

  return `
🎉 <b>Добро пожаловать, ${username}!</b> 🎉

Ты попал в самый крутой касса! 

⚡️ <b>Что тебя ждет:</b>
• 🔥 Обмен БЕЗ комиссий
• 🚀 Мгновенные переводы
• 🛡️ 100% анонимность

✨ <b>Преимущества:</b>
✅ Быстро — переводы за секунды
✅ Надежно — защита каждой операции  
✅ Удобно — простой и понятный интерфейс

📞 <b>Наша поддержка:</b>
Не стесняйся обращаться! 
👉 <a href="${faq.link}">${faq.username}</a>

🚀 <b>Готов начать?</b>
Жми на кнопку меню и выбирай нужную операцию!
`;
};
