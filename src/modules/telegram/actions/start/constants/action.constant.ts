import { TelegramScenes } from 'src/modules/telegram/scenes';

export const START_ACTIONS = {
  replenish: 'replenish',
  withdraw: 'withdraw',
};

export const START_ACTIONS_SCENES = {
  [START_ACTIONS.replenish]: TelegramScenes.REPLENISH,
  [START_ACTIONS.withdraw]: TelegramScenes.WITHDRAW,
};

export const START_ACTIONS_TEXT = {
  [START_ACTIONS.replenish]: '💰 Пополнить баланс',
  [START_ACTIONS.withdraw]: '💸 Вывести средства',
};
