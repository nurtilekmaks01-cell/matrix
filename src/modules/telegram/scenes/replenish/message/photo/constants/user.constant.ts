import { FaqService } from 'src/helpers/faq/faq.service';
import { BOOKMAKER_TEXT, EBookmakers } from 'src/shared/types/telegram';

interface IReplenishUserArgs {
  bet_id: string;
  price: string;
  bookmaker: EBookmakers;
  faqService: FaqService;
}
export const replenishUserText = (args: IReplenishUserArgs) => {
  const { bet_id, price, faqService, bookmaker } = args;
  const faq = faqService.faq;

  const text = `
✅Ваша заявка принята на проверку!
🆔 ${BOOKMAKER_TEXT[bookmaker]}: ${bet_id}
💵Сумма: ${price}

<a href="${faq.link}">${faq.username}</a>
`;

  return text;
};
