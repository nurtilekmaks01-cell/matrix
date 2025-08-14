/**
 * Ищет сумму платежа в тексте чека (поддерживает О!Деньги, mbank, simbank и др.)
 * @param text Распознанный текст чека
 * @returns Найденная сумма (null, если не найдена)
 */
function extractMBankAmount(text: string): number | null {
  const patterns = [
    // Вариант 1: Сумма после "Сумма" (учитываем разные форматы)
    /Сумма[\s:]*(\d+[.,]\d{2})/i,

    // Вариант 2: Сумма в строке с "- 100,00 ©"
    /-\s*(\d+[.,]\d{2})\s*©/,

    // Вариант 3: Сумма в формате "100.00 К&5"
    /(\d+[.,]\d{2})\s*К&5/,

    // Вариант 4: Сумма в конце строки с валютой
    /(\d+[.,]\d{2})\s*(сом|kgs|₸|©|с)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      const amountStr = match[1].replace(',', '.');
      const amount = parseFloat(amountStr);
      if (!isNaN(amount)) {
        return amount;
      }
    }
  }

  return null;
}

function extractPaymentAmount(text: string): number | null {
  // Сначала проверяем специфичные форматы банков
  if (text.includes('МВАМК') || text.includes('Сумма')) {
    const mbankAmount = extractMBankAmount(text);
    if (mbankAmount) return mbankAmount;
  }

  // Затем общие шаблоны
  const generalPatterns = [
    /(\d+[.,]\d{2})\s*(сом|kgs|₸|тенге|руб|₽|©|с)/i,
    /-\s*(\d+[.,]?\d*)\s*$/m,
    /(\d+)\s*с(?!\w)/i,
  ];

  for (const pattern of generalPatterns) {
    const match = text.match(pattern);
    if (match) {
      const amountStr = (match[1] || match[2]).replace(',', '.');
      const amount = parseFloat(amountStr);
      if (!isNaN(amount)) return amount;
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
