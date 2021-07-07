import { NativeModules } from 'react-native';

type NativeModuleType = typeof NativeModules & {
  ThermalPrinterModule: {
    printTcp(
      ip: string,
      port: number,
      payload: string,
      autoCut: boolean,
      openCashbox: boolean,
      mmFeedPaper: number,
      printerDpi: number,
      printerWidthMM: number,
      printerNbrCharactersPerLine: number
    ): Promise<void>;
  };
};

const {
  ThermalPrinterModule,
}: NativeModuleType = NativeModules as NativeModuleType;

interface PrinterInterface {
  payload: string;
  autoCut: boolean;
  openCashbox: boolean;
  mmFeedPaper: number;
  printerDpi: number;
  printerWidthMM: number;
  printerNbrCharactersPerLine: number;
}

interface PrintTcpInterface extends PrinterInterface {
  ip: string;
  port: number;
}

let defaultConfig: PrintTcpInterface = {
  ip: '192.168.192.168',
  port: 9100,
  payload: '',
  autoCut: true,
  openCashbox: false,
  mmFeedPaper: 20,
  printerDpi: 203,
  printerWidthMM: 80,
  printerNbrCharactersPerLine: 42,
};

const printTcp = async (
  args: Partial<PrintTcpInterface> & Pick<PrinterInterface, 'payload'>
): Promise<void> => {
  const ip: string = args.ip !== undefined ? args.ip : defaultConfig.ip;
  const port: number = args.port !== undefined ? args.port : defaultConfig.port;
  const payload: string =
    args.payload !== undefined ? args.payload : defaultConfig.payload;
  const autoCut: boolean =
    args.autoCut !== undefined ? args.autoCut : defaultConfig.autoCut;
  const openCashbox: boolean =
    args.openCashbox !== undefined
      ? args.openCashbox
      : defaultConfig.openCashbox;
  const mmFeedPaper: number =
    args.mmFeedPaper !== undefined
      ? args.mmFeedPaper
      : defaultConfig.mmFeedPaper;
  const printerDpi: number =
    args.printerDpi !== undefined ? args.printerDpi : defaultConfig.printerDpi;
  const printerWidthMM: number =
    args.printerWidthMM !== undefined
      ? args.printerWidthMM
      : defaultConfig.printerWidthMM;
  const printerNbrCharactersPerLine: number =
    args.printerNbrCharactersPerLine !== undefined
      ? args.printerNbrCharactersPerLine
      : defaultConfig.printerNbrCharactersPerLine;

  await ThermalPrinterModule.printTcp(
    ip,
    port,
    payload,
    autoCut,
    openCashbox,
    mmFeedPaper,
    printerDpi,
    printerWidthMM,
    printerNbrCharactersPerLine
  );
};

export default { printTcp, defaultConfig };
