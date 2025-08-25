/**
 * Проверяет наличие конкретной суммы в тексте чека
 * @param text Текст чека
 * @param targetAmount Искомая сумма (например 2000)
 * @returns true если сумма найдена
 */
function isAmountPresent(text: string, targetAmount: number): boolean {
  // Нормализуем текст
  const cleanText = text.toLowerCase().replace('-', '').replace(/\s+/g, ''); // Удаляем точки и запятые для упрощения сравнения

  // Создаем варианты суммы без форматирования
  const simpleAmount = targetAmount.toString();

  console.log(cleanText, 'ccleanText');

  // Ключевые фразы, после которых идет сумма
  const amountPrefixes = [
    'проведено',
    'сумма платежа:',
    'сумма итого:',
    'сумма:',
    'amount:',
    'kgs',
    'кбс5',
    'кс$',
  ];

  // Создаем шаблоны для поиска
  const patterns = [
    // Варианты с префиксами (например "сумма платежа: 10000")
    ...amountPrefixes.map((prefix) => `${prefix}\\s*${simpleAmount}`),

    // Варианты с валютой (например "10000 kgs")
    `${simpleAmount}\\s*(kgs|кбс5|кс$|сом|с)`,

    // Варианты с разделителями (например "10 000")
    simpleAmount,
    new Intl.NumberFormat('ru-RU').format(targetAmount).replace(/,/g, ''),
    `${new Intl.NumberFormat('ru-RU').format(targetAmount).replace(/,/g, '')}.00`,
    `${new Intl.NumberFormat('ru-RU').format(targetAmount).replace(/,/g, '')},00`,
    new Intl.NumberFormat('en-US').format(targetAmount).replace(/,/g, ''),
    new Intl.NumberFormat('ru-RU').format(targetAmount),
    `${new Intl.NumberFormat('ru-RU').format(targetAmount)}.00`,
    `${new Intl.NumberFormat('ru-RU').format(targetAmount)},00`,
    new Intl.NumberFormat('en-US').format(targetAmount),
  ];

  console.log(patterns, '[atter]');

  console.log(cleanText.includes('2 385,00'), '2 385,00');

  // Проверяем все варианты
  const results = patterns.find((pattern) => {
    console.log(cleanText.includes(pattern), pattern, 'patter');

    return cleanText.includes(pattern);
  });

  console.log(results, 'resulsta');

  return !!results;
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
