import { FaqService } from 'src/helpers/faq/faq.service';

interface IWelcomeMessageArgs {
  username: string;
  faqService: FaqService;
}

export const WELCOME_MESSAGE = (args: IWelcomeMessageArgs) => {
  const { username, faqService } = args;
  const faq = faqService.faq;

  return `
🎯 <b>ДОБРО ПОЖАЛОВАТЬ, ${username.toUpperCase()}!</b>

━━━━━━━━━━━━━━━━━━━━
⚡️ <b>НАШИ ПРЕИМУЩЕСТВА</b>
• <b>Скорость:</b> Переводы за 15-60 секунд
• <b>Анонимность:</b> Без регистрации и верификации
• <b>Выгода:</b> Лучший курс без скрытых комиссий
• <b>Надёжность:</b> Автоматизированные гарантии

━━━━━━━━━━━━━━━━━━━━
💬 <b>ПОДДЕРЖКА</b>
📞 <a href="${faq.link}">${faq.username}</a>
`;
};
