/**
 * Проверяет наличие конкретной суммы в тексте чека
 * @param text Текст чека
 * @param targetAmount Искомая сумма (например 2000)
 * @returns true если сумма найдена
 */
function isAmountPresent(text: string, targetAmount: number): boolean {
  // Сначала нормализуем текст (удаляем лишние пробелы и приводим к нижнему регистру)
  const cleanText = text.toLowerCase().replace(/\s+/g, ' ');

  // Все возможные варианты написания суммы
  const amountVariants = [
    targetAmount.toString(), // "2000"
    targetAmount.toFixed(2).replace('.', ','), // "2000,00"
    targetAmount.toFixed(2), // "2000.00"
    new Intl.NumberFormat('ru-RU').format(targetAmount), // "2 000"
    // Варианты с пробелами и запятыми
    new Intl.NumberFormat('ru-RU').format(targetAmount) + ',00', // "2 000,00"
    new Intl.NumberFormat('en-US').format(targetAmount) + '.00', // "2,000.00"
    // Варианты с валютами
    `${targetAmount} с`,
    `${targetAmount} сом`,
    `${targetAmount} ©`,
    `${targetAmount.toFixed(2)} К©С5`,
    // Дополнительные форматы из примеров
    `- ${new Intl.NumberFormat('ru-RU').format(targetAmount)},00 ©`, // "- 2 000,00 ©"
    `${new Intl.NumberFormat('en-US').format(targetAmount)}.00 к©с5`, // "2,000.00 К©С5"
  ];

  // Удаляем дубликаты
  const uniqueVariants = [...new Set(amountVariants)];

  // Проверяем все варианты
  return uniqueVariants.some(
    (variant) =>
      cleanText.includes(variant.toLowerCase()) ||
      new RegExp(`\\b${variant}\\b`, 'i').test(cleanText),
  );
}

/**
 * Упрощенная проверка платежа (только точное совпадение)
 * @param recognizedText Текст чека
 * @param expectedAmount Ожидаемая сумма
 * @returns Результат проверки
 */
export function checkPaymentUniversal(
  recognizedText: string,
  expectedAmount: number,
): { success: boolean; error?: string } {
  if (isAmountPresent(recognizedText, expectedAmount)) {
    return { success: true };
  }

  return {
    success: false,
    error: `Сумма ${expectedAmount} не найдена в чеке`,
  };
}

export const errorPaymentUniversalMessageText = () => {
  return `
⚠️ Проблема с проверкой платежа
Пожалуйста, убедитесь что:
1. Фото чека хорошего качества
2. Вы отправили правильный чек
`;
};
