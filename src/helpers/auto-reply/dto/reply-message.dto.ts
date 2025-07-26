export enum AutoReplyType {
  VIDEO = 'video',
  AUDIO = 'audio',
  DOCUMENT = 'document',
  PHOTO = 'photo',
  TEXT = 'text',
  STICKER = 'sticker',
  VOICE = 'voice',
}

export class ReplyMessageDto {
  text: string;
  type: AutoReplyType;
  photo?: string;
}
