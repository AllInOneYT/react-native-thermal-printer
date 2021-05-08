import { NativeModules } from 'react-native';

type ThermalPrinterType = {
  multiply(a: number, b: number): Promise<number>;
};

const { ThermalPrinter } = NativeModules;

export default ThermalPrinter as ThermalPrinterType;
