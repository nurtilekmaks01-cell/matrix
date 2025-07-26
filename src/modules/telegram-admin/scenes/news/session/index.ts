import { AutoReplyType } from 'src/helpers/auto-reply/dto/reply-message.dto';
import { ITelegramDefaultSession } from 'src/shared/types/session';

export interface IAdminNewsSession extends ITelegramDefaultSession {
  text: string;
  type: AutoReplyType;
  photo?: string;
}

export const clearAdminNewsSession = (session: IAdminNewsSession) => {
  session.text = '';
  session.type = AutoReplyType.TEXT;
  session.photo = undefined;
};
