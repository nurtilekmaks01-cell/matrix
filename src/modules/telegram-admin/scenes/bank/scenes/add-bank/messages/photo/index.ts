/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { AxiosFileService } from 'src/helpers/axios/services/file.service';
import { QrcodeService } from 'src/helpers/qrcode/qrcode.service';
import { PhotoSize } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';
import { IAddBankSession } from '../../session';
import { BankService } from 'src/modules/bank/bank.service';
import { CreateBankDto } from 'src/modules/bank/dto/create-bank.dto';
import { EBanks } from 'src/modules/bank/shared/types';

interface ICreateBankArgs {
  session: IAddBankSession;
  bankService: BankService;
}
const createBank = async (args: ICreateBankArgs) => {
  const { session, bankService } = args;

  const url = new URL(session.qrcode_url || '');

  const createBankDto: CreateBankDto = {
    href: url.href,
    link_hash: url.hash,
    name: session.phone_number as string,
    qrcode_link: url.href,
    type: EBanks.OPTIMA,
    phone_number: session.phone_number as string,
  };

  await bankService.create(createBankDto);
};

const generateText = () => {
  const text = `Successfully added bank`;

  return text;
};

interface IPhotoArgs {
  ctx: SceneContext;
  photo: PhotoSize[];
  qrcodeService: QrcodeService;
  axiosFileService: AxiosFileService;
  bankService: BankService;
}
export const onMessagePhoto = async (args: IPhotoArgs) => {
  const { ctx, photo, qrcodeService, axiosFileService, bankService } = args;

  const session = ctx.session as IAddBankSession;

  const file = photo.pop();
  const file_id = file?.file_id;

  if (file_id) {
    const { href } = await ctx.telegram.getFileLink(file_id);

    try {
      const buffer = await axiosFileService.getBufferResponse({
        href,
      });

      const response = await qrcodeService.decodeQrCodeFromBuffer({
        buffer,
      });

      const caption = generateText();

      await ctx.replyWithPhoto(file_id, { caption });

      session.qrcode_url = response.link;
      await createBank({ session, bankService });
    } catch (error) {
      await ctx.replyWithHTML(`${error?.message}`);
    }
  }
};
