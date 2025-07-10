import { FaqService } from 'src/helpers/faq/faq.service';

interface IWelcomeMessageArgs {
  username: string;
  faqService: FaqService;
}
// src/constants/messages.constants.ts
export const WELCOME_MESSAGE = (args: IWelcomeMessageArgs) => {
  const { username, faqService } = args;
  const faq = faqService.faq;

  return `
Привет, <b>${username}</b>!  
Пополнение и выводы  🇰🇬
  
💰 0% комиссии
🔒 Защищенные транзакции 
⚡ Обработка: 10 сек - 1 мин
👨‍💻 Поддержка: <a href="${faq.link}">${faq.username}</a> 
Работаем 24/7! 💯
`;
};
