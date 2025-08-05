import { FaqService } from 'src/helpers/faq/faq.service';

interface IWelcomeMessageArgs {
  username: string;
  faqService: FaqService;
}
export const WELCOME_MESSAGE = (args: IWelcomeMessageArgs) => {
  const { username, faqService } = args;
  const faq = faqService.faq;

  return `
👋 <b>${username}</b>, привет!  

💰 Обмен без комиссий  
⚡ Переводы за секунды  
🛡️ Безопасно и анонимно  

💬 Поддержка: <a href="${faq.link}">${faq.username}</a>  
`;
};
