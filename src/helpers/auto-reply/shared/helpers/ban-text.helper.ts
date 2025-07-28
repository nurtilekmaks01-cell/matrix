import { User } from 'src/modules/user/entities/user.entity';
import * as moment from 'moment';

interface IBanTextArgs {
  user: User;
  index: number;
}
export const banTextHelper = (args: IBanTextArgs) => {
  const { user, index } = args;

  const createdAt = user.createdAt
    ? moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss')
    : 'N/A';
  const updatedAt = user.updatedAt
    ? moment(user.updatedAt).format('YYYY-MM-DD HH:mm:ss')
    : 'N/A';

  const keyupCount = user.keyup ? user.keyup.length : 0;
  const replenishCount = user.replenish ? user.replenish.length : 0;
  const withdrawCount = user.withdraw ? user.withdraw.length : 0;

  const text = `
🔢 ${index} | 👤 ${user?.first_name || user?.last_name || 'Без имени'} (@${user?.username})
🆔 TG ID: <code>${user?.telegram_id}</code>
📊 Действий: <code>${user?.action_count || 0}</code> 
🚫 Бан: <code>${user?.is_baned ? 'Да' : 'Нет'}</code>
📅 Создан: <code>${createdAt}</code> 
Обновлен: <code>${updatedAt}</code>
🔑 KeyUp: <code>${keyupCount}</code>
💰 Пополнений: <code>${replenishCount}</code>
🏧 Выводов: <code>${withdrawCount}</code>
`;

  return text;
};
