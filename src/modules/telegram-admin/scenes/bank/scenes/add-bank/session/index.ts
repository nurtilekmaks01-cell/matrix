export interface IAddBankSession {
  phone_number?: string;
  qrcode_url?: string;
}

export const clearAddBankSession = (session: IAddBankSession) => {
  session.phone_number = undefined;
  session.qrcode_url = undefined;
};
