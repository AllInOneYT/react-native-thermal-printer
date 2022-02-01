import ReactNativeThermalPrinter from '../index';
import { NativeModules } from 'react-native';

type MapKey<T extends { [key: string]: any }> = {
  [K in keyof T]: K;
};

type FlattenConfigKey = MapKey<
  typeof ReactNativeThermalPrinter.defaultConfig
>[keyof typeof ReactNativeThermalPrinter.defaultConfig];

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');

  RN.NativeModules.ThermalPrinterModule = {
    printTcp: jest.fn(),
    printBluetooth: jest.fn(),
  };

  return RN;
});

describe('React Native Thermal Printer Module', () => {
  it('should provide a way to set the default config individually', async () => {
    const args: typeof ReactNativeThermalPrinter.defaultConfig = {
      macAddress: '',
      ip: '2.2.2.2',
      port: 8000,
      payload: 'ccc',
      autoCut: false,
      openCashbox: true,
      mmFeedPaper: 33,
      printerDpi: 44,
      printerWidthMM: 55,
      printerNbrCharactersPerLine: 66,
    };

    Object.keys(ReactNativeThermalPrinter.defaultConfig).forEach(
      (key: string) => {
        const castedKey = key as FlattenConfigKey;

        ReactNativeThermalPrinter.defaultConfig[castedKey] = args[
          castedKey
        ] as never;

        expect(ReactNativeThermalPrinter.defaultConfig[castedKey]).toBe(
          args[castedKey]
        );
      }
    );
  });

  describe('printTcp', () => {
    it('should call the native method', async () => {
      const args = { payload: 'test' };

      await ReactNativeThermalPrinter.printTcp(args);

      expect(NativeModules.ThermalPrinterModule.printTcp).toBeCalledTimes(1);
    });

    it('should use the default config when no args are passed', async () => {
      const defaultConfig = ReactNativeThermalPrinter.defaultConfig;
      const args = { payload: 'test' };

      await ReactNativeThermalPrinter.printTcp(args);

      expect(NativeModules.ThermalPrinterModule.printTcp).toBeCalledWith(
        defaultConfig.ip,
        defaultConfig.port,
        args.payload,
        defaultConfig.autoCut,
        defaultConfig.openCashbox,
        defaultConfig.mmFeedPaper,
        defaultConfig.printerDpi,
        defaultConfig.printerWidthMM,
        defaultConfig.printerNbrCharactersPerLine
      );
    });

    it('should pass args to the native module', async () => {
      const ip: string = '1.1.1.1';
      const port: number = 9000;
      const payload: string = 'abc';
      const autoCut: boolean = false;
      const openCashbox: boolean = true;
      const mmFeedPaper: number = 40;
      const printerDpi: number = 303;
      const printerWidthMM: number = 20;
      const printerNbrCharactersPerLine: number = 62;

      await ReactNativeThermalPrinter.printTcp({
        ip,
        port,
        payload,
        autoCut,
        openCashbox,
        mmFeedPaper,
        printerDpi,
        printerWidthMM,
        printerNbrCharactersPerLine,
      });

      expect(NativeModules.ThermalPrinterModule.printTcp).toBeCalledWith(
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
    });
  });

  describe('printBluetooth', () => {
    it('should call the native method', async () => {
      const args = { payload: 'test', macAddress: '' };

      await ReactNativeThermalPrinter.printBluetooth(args);

      expect(NativeModules.ThermalPrinterModule.printBluetooth).toBeCalledTimes(
        1
      );
    });
    it('should use the default config when no args are passed', async () => {
      const defaultConfig = ReactNativeThermalPrinter.defaultConfig;
      const args = { payload: 'test', macAddress: '' };

      await ReactNativeThermalPrinter.printBluetooth(args);

      expect(NativeModules.ThermalPrinterModule.printBluetooth).toBeCalledWith(
        args.macAddress,
        args.payload,
        defaultConfig.autoCut,
        defaultConfig.openCashbox,
        defaultConfig.mmFeedPaper,
        defaultConfig.printerDpi,
        defaultConfig.printerWidthMM,
        defaultConfig.printerNbrCharactersPerLine
      );
    });
    it('should pass args to the native module', async () => {
      const macAddress: string = '';
      const payload: string = 'abc';
      const autoCut: boolean = false;
      const openCashbox: boolean = true;
      const mmFeedPaper: number = 40;
      const printerDpi: number = 303;
      const printerWidthMM: number = 20;
      const printerNbrCharactersPerLine: number = 62;

      await ReactNativeThermalPrinter.printBluetooth({
        macAddress,
        payload,
        autoCut,
        openCashbox,
        mmFeedPaper,
        printerDpi,
        printerWidthMM,
        printerNbrCharactersPerLine,
      });

      expect(NativeModules.ThermalPrinterModule.printBluetooth).toBeCalledWith(
        macAddress,
        payload,
        autoCut,
        openCashbox,
        mmFeedPaper,
        printerDpi,
        printerWidthMM,
        printerNbrCharactersPerLine
      );
    });
  });
});
