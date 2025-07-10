import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Telegraf } from 'telegraf';
import { TelegramConfig } from './helpers/config/services/telegram.config';

@Catch() // Catch all exceptions, not just HttpException
export class AllExceptionsFilter implements ExceptionFilter {
  private bot: Telegraf;
  private chatId: string;

  constructor(private readonly telegramConfig: TelegramConfig) {
    // Initialize the bot and chat ID using ConfigService
    const botToken = this.telegramConfig.bot_token;
    this.chatId = this.telegramConfig.error_chat_id; // Add TELEGRAM_CHAT_ID to your config
    this.bot = new Telegraf(botToken);
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500; // Default status code for unhandled errors
    let message = 'Internal server error';
    let error = 'Error';
    let stack: string | undefined;

    if (exception instanceof HttpException) {
      // Handle HttpException
      status = exception.getStatus();
      message = exception.message;
      error = exception.name;
      stack = exception.stack;
    } else if (exception instanceof Error) {
      // Handle generic JavaScript errors
      message = exception.message;
      error = exception.name;
      stack = exception.stack;
    } else {
      // Handle cases where the exception is not an Error object
      message = 'Unknown error occurred';
      error = 'UnknownError';
    }

    // Construct the error message for Telegram
    const text = `
  Error: ${error}
  Message: ${message}
  Stack: ${stack || 'No stack trace available'}
  URL: ${request.url}
  Method: ${request.method}
  Timestamp: ${new Date().toISOString()}
      `;

    // Send the error message to Telegram
    try {
      void this.bot.telegram.sendMessage(this.chatId, text);
    } catch (error) {
      console.error('Failed to send error message to Telegram:', error);
    }

    if (response) {
      if (typeof response.status === 'function') {
        response?.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: message,
          error: error,
        });
      }
    } else {
      void this.bot.telegram.sendMessage(
        this.chatId,
        'catch response is undefined or null',
      );
    }
    // Send a response to the client
  }
}
