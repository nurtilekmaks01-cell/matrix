// src/utils/user.utils.ts
import { User } from 'telegraf/typings/core/types/typegram';

export const formatUsername = (user: User | undefined): string => {
  const name = user?.username || user?.first_name || user?.last_name;
  return name || String(user?.id || 'Аноним');
};
