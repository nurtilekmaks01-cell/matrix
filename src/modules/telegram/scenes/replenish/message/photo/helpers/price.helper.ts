/**
 * Ищет сумму платежа в тексте чека (поддерживает О!Деньги, mbank, simbank и др.)
 * @param text Распознанный текст чека
 * @returns Найденная сумма (null, если не найдена)
 */
function extractPaymentAmount(text: string): number | null {
  // Нормализация текста
  const cleanText = text
    .replace(/\s+/g, ' ') // Удаляем лишние пробелы
    .replace(/(\d)\s+([.,]\d{2})/g, '$1$2') // Исправляем "7 000.00" → "7000.00"
    .toLowerCase();

  // Улучшенные шаблоны для всех банков
  const amountPatterns = [
    // Для SimBank (формат "7000 с")
    /(\d{3,})\s*с(?!\w)/, // Ищем 3+ цифры перед "с"

    // Для О!Деньги (формат "50,00 с")
    /(\d+[.,]\d{2})\s*с(?!\w)/,

    // Для MBank (формат "Сумма 100.00")
    /(сумма|итого|оплачено)\s*[:]?\s*(\d+[.,]\d{2})/i,

    // Общий паттерн для чисел с валютой
    /(\d+[.,]?\d*)\s*(сом|kgs|₸|тенге|руб|₽|©|с)/i,

    // Числа в конце строки после "-"
    /-\s*(\d+[.,]?\d*)\s*$/m,
  ];

  for (const pattern of amountPatterns) {
    const match = cleanText.match(pattern);
    if (match) {
      const amountStr = (match[1] || match[2])
        .replace(',', '.') // Заменяем запятую на точку
        .replace(/\s+/g, ''); // Удаляем пробелы в числах (7 000 → 7000)

      const amount = parseFloat(amountStr);
      if (!isNaN(amount)) {
        return amount;
      }
    }
  }

  return null;
}

/**
 * Проверяет, совпадает ли сумма в чеке с ожидаемой
 * @param recognizedText Текст чека (из Tesseract)
 * @param expectedAmount Ожидаемая сумма
 * @returns { success: boolean, amount?: number, error?: string }
 */
export function checkPaymentUniversal(
  recognizedText: string,
  expectedAmount: number,
): { success: boolean; amount?: number; error?: string } {
  const amount = extractPaymentAmount(recognizedText);

  if (amount === null) {
    return { success: false, error: 'Сумма платежа не найдена' };
  }

  if (Math.abs(amount - expectedAmount) > 0.01) {
    return {
      success: false,
      error: `Сумма не совпадает (${amount} ≠ ${expectedAmount})`,
    };
  }

  return { success: true, amount };
}

export const errorPaymentUniversalMessageText = () => {
  const text = `
 ⚠️ Проблема с проверкой платежа
Возможные причины:
1. Сумма не видна или засвечена
2. Неправильный формат чека
3. Проблемы с соединением
Попробуйте отправить чек еще раз
`;

  return text;
};
