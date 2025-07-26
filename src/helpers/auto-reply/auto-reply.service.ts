import { Injectable } from '@nestjs/common';
import { CreateAutoReplyDto } from './dto/create-auto-reply.dto';
import { UpdateAutoReplyDto } from './dto/update-auto-reply.dto';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { UserService } from 'src/modules/user/user.service';
import { sleep } from 'src/shared/utils/helpers/fetch.helper';
import { AutoReplyType, ReplyMessageDto } from './dto/reply-message.dto';
import { TelegramConfig } from '../config/services/telegram.config';

@Injectable()
export class AutoReplyService {
  private readonly auto_reply_group_id: string;
  constructor(
    @InjectBot('capital_bot') private telegraf: Telegraf<Context>,
    private readonly userService: UserService,
    private readonly telegramConfig: TelegramConfig,
  ) {
    this.auto_reply_group_id = this.telegramConfig.auto_reply_chat_id;
  }

  async sendAutoReplyMessage(replyMessageDto: ReplyMessageDto) {
    const { text, type, photo } = replyMessageDto;
    const users = await this.userService.findAll();
    let count = 0;

    for (const user of users) {
      try {
        console.log(user, 'user');
        console.log(replyMessageDto, 'replyMessageDto');

        const chat_id = Number(user.telegram_id);
        if (type === AutoReplyType.TEXT) {
          await this.telegraf.telegram.sendMessage(chat_id, text);
        } else if (type === AutoReplyType.PHOTO) {
          if (photo) {
            await this.telegraf.telegram.sendPhoto(
              chat_id,
              { url: photo },
              {
                caption: text,
              },
            );
          }
        }

        await sleep(1000);

        const auth_reply_chat_text = `${count + 1}.${user.first_name}, sended auto reply. ${user.username}`;
        await this.telegraf.telegram.sendMessage(
          this.auto_reply_group_id,
          auth_reply_chat_text,
        );

        count++;

        await sleep(1000);
      } catch (error) {
        console.error(`Failed to send message to user ${user.id}:`, error);
      }
    }
  }

  create(createAutoReplyDto: CreateAutoReplyDto) {
    return 'This action adds a new autoReply';
  }

  findAll() {
    return `This action returns all autoReply`;
  }

  findOne(id: number) {
    return `This action returns a #${id} autoReply`;
  }

  update(id: number, updateAutoReplyDto: UpdateAutoReplyDto) {
    return `This action updates a #${id} autoReply`;
  }

  remove(id: number) {
    return `This action removes a #${id} autoReply`;
  }
}
