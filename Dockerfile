# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./
COPY yarn.lock ./

# Устанавливаем зависимости
RUN yarn install

# Копируем исходный код
COPY . .

# Собираем приложение (если используется TypeScript)
RUN yarn build

# Экспортируем порт
EXPOSE 3000

# Запускаем приложение
CMD ["yarn", "start:prod"]