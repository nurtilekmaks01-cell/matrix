interface IQrCodeUrlArgs {
  price?: string;
  replace_url?: string;
  hash?: string;
}

export const generateMbankQrCodeUrl = (args: IQrCodeUrlArgs) => {
  const { replace_url, hash } = args;
  const baseUrl = 'https://app.mbank.kg/qr/#';

  // Ищем имя (последнее слово из букв)

  if (!replace_url) {
    return new URL(`${baseUrl}${hash?.replace('#', '')}`).href;
  }

  // Генерация QR-кода для mBank
  const qrCodeUrl = replace_url.replace(/^https?:\/\/[^#]+#/, baseUrl);
  return new URL(qrCodeUrl).href;
};

export const generateOMoneyQrCodeUrl = (args: IQrCodeUrlArgs) => {
  const { replace_url, hash } = args;
  const baseUrl = 'https://api.dengi.o.kg/qr/#';

  // Ищем имя (последнее слово из букв)

  if (!replace_url) {
    return new URL(`${baseUrl}${hash?.replace('#', '')}`).href;
  }

  // Генерация QR-кода для mBank
  const qrCodeUrl = replace_url.replace(/^https?:\/\/[^#]+#/, baseUrl);
  return qrCodeUrl;
};

export const generateMegaPayQrCodeUrl = (args: IQrCodeUrlArgs) => {
  const { replace_url, hash } = args;

  const baseUrl = 'https://megapay.kg/get/qr/#';

  // Ищем имя (последнее слово из букв)

  if (!replace_url) {
    return new URL(`${baseUrl}${hash?.replace('#', '')}`).href;
  }

  // Генерация QR-кода для mBank
  const qrCodeUrl = replace_url.replace(/^https?:\/\/[^#]+#/, baseUrl);
  return qrCodeUrl;
};

export const generateBalanceQrCodeUrl = (args: IQrCodeUrlArgs) => {
  const { replace_url, hash } = args;
  const baseUrl = 'https://balance.kg/qr/#';

  // Ищем имя (последнее слово из букв)

  if (!replace_url) {
    return new URL(`${baseUrl}${hash?.replace('#', '')}`).href;
  }

  // Генерация QR-кода для mBank
  const qrCodeUrl = replace_url.replace(/^https?:\/\/[^#]+#/, baseUrl);
  return qrCodeUrl;
};

export const generateBakaiQrCodeUrl = (args: IQrCodeUrlArgs) => {
  const { replace_url, hash } = args;

  const baseUrl = 'https://bakai24.app/qr/#';

  // Ищем имя (последнее слово из букв)
  if (!replace_url) {
    return new URL(`${baseUrl}${hash?.replace('#', '')}`).href;
  }

  // Генерация QR-кода для mBank
  const qrCodeUrl = replace_url.replace(/^https?:\/\/[^#]+#/, baseUrl);
  return qrCodeUrl;
};
