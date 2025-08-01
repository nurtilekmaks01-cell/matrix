import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TelegramConfig } from './helpers/config/services/telegram.config';
import { AllExceptionsFilter } from './exception';
import { AppConfig } from './helpers/config/services/app.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appConfig = app.get(AppConfig);
  const telegramConfig = app.get(TelegramConfig);
  app.useGlobalFilters(new AllExceptionsFilter(telegramConfig));

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const port = appConfig.port;

  await app.listen(port, () => {
    console.log(`${port} is starting...`);
  });
}
bootstrap();
