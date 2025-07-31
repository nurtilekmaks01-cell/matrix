import * as crypto from 'crypto';

export const generateSHA256 = (data: string) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

export const generateMD5 = (data: string) => {
  return crypto.createHash('md5').update(data).digest('hex');
};

// Helper for generating the confirm string
export const generateConfirm = (param1: string, param2: string): string => {
  return generateMD5(`${param1}:${param2}`);
};
