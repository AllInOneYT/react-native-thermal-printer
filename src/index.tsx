import { NativeModules } from 'react-native';

const { ThermalPrinterModule } = NativeModules;

interface PrinterInterface {
  payload: string;
  autoCut?: boolean;
  openCashbox?: boolean;
  mmFeedPaper?: number;
  printerDpi?: number;
  printerWidthMM?: number;
  printerNbrCharactersPerLine?: number;
}

interface PrintTcpInterface extends PrinterInterface {
  ip?: string;
  port?: number;
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

const printTcp = (args: PrintTcpInterface): void => {
  ThermalPrinterModule.printTcp(
    args.ip || defaultConfig.ip,
    args.port || defaultConfig.port,
    args.payload || defaultConfig.payload,
    args.autoCut || defaultConfig.autoCut,
    args.openCashbox || defaultConfig.openCashbox,
    args.mmFeedPaper || defaultConfig.mmFeedPaper,
    args.printerDpi || defaultConfig.printerDpi,
    args.printerWidthMM || defaultConfig.printerWidthMM,
    args.printerNbrCharactersPerLine ||
      defaultConfig.printerNbrCharactersPerLine
  );
};

export default { printTcp, defaultConfig };
