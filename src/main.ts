import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TelegramConfig } from './helpers/config/services/telegram.config';
import { AllExceptionsFilter } from './exception';
import { AppConfig } from './helpers/config/services/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get(AppConfig);
  const telegramConfig = app.get(TelegramConfig);
  app.useGlobalFilters(new AllExceptionsFilter(telegramConfig));

  const port = appConfig.port;

  await app.listen(port, () => {
    console.log(`${port} is starting...`);
  });
}
bootstrap();
