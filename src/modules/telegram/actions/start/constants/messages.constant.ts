import { FaqService } from 'src/helpers/faq/faq.service';

interface IWelcomeMessageArgs {
  username: string;
  faqService: FaqService;
}
export const WELCOME_MESSAGE = (args: IWelcomeMessageArgs) => {
  const { username, faqService } = args;
  const faq = faqService.faq;

  return `
👋 Добро пожаловать, <b>${username}</b>!

• Обмен без комиссий
• Мгновенные переводы  
• Полная анонимность

📞 Поддержка: <a href="${faq.link}">${faq.username}</a>
`;
};
