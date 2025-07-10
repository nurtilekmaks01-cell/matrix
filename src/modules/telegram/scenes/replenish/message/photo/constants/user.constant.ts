import { FaqService } from 'src/helpers/faq/faq.service';

interface IReplenishUserArgs {
  bet_id: string;
  price: string;
  faqService: FaqService;
}
export const replenishUserText = (args: IReplenishUserArgs) => {
  const { bet_id, price, faqService } = args;
  const faq = faqService.faq;

  const text = `
✅Ваша заявка принята на проверку!
🆔ID 1XBET: ${bet_id}
💵Сумма: ${price}

💰Комиссия: 0%

⚠️ Пополнение занимает от 5 секунды до 15 минут

Пожалуйста подождите!

✅Вы получите уведомление о зачислении средств!

Если возникли проблемы 👇
👨‍💻Оператор: <a href="${faq.link}">${faq.username}</a>
`;

  return text;
};
