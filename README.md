# react-native-thermal-printer

native bridge for thermal printer

### :warning: v2 breaking change

- :fire: Changed to promise based <-- this might break your code
- :fire: More flexible error handling
- :fire: Bugs fixed

### Android Only

bridged library:
https://github.com/DantSu/ESCPOS-ThermalPrinter-Android/tree/3.0.1

## Installation

```sh
npm install react-native-thermal-printer
```

or

```sh
yarn add react-native-thermal-printer
```

### Android Manifest

make sure you have the following permission in android/app/src/main/AndroidManifest.xml

network printing

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

bluetooth printing

```xml
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
```

## Usage

### Import the module

```js
import ThermalPrinterModule from 'react-native-thermal-printer';
```

### Set the default config

```js
ThermalPrinterModule.defaultConfig.ip = '192.168.100.246';
ThermalPrinterModule.defaultConfig.port = 9100;
ThermalPrinterModule.defaultConfig.autoCut = false;
ThermalPrinterModule.defaultConfig.timeout = 30000; // in milliseconds (version >= 2.2.0)
```

or

```js
ThermalPrinterModule.defaultConfig = {
  ...ThermalPrinterModule.defaultConfig,
  ip: '192.168.100.246',
  port: 9100,
  autoCut: false,
  timeout: 30000, // in milliseconds (version >= 2.2.0)
};
```

### Send the payload

```js
// inside async function
try {
  await ThermalPrinterModule.printTcp({ payload: 'hello world' });
} catch (err) {
  //error handling
  console.log(err.message);
}
```

you can also specify the config each time calling the method

```js
// inside async function
try {
  await ThermalPrinterModule.printTcp({
    ip: '192.168.100.246',
    port: 9100,
    payload: 'hello world',
    printerWidthMM: 50,
    timeout: 30000, // in milliseconds (version >= 2.2.0)
  });
  await ThermalPrinterModule.printTcp({
    ip: '192.168.100.247',
    port: 9100,
    payload: 'hello world',
    autoCut: false,
    timeout: 30000, // in milliseconds (version >= 2.2.0)
  });
} catch (err) {
  //error handling
  console.log(err.message);
}
```

#### Bluetooth

pair your bluetooth device and call the printBluetooth method, all configurations remain the same

```ts
// inside async function
try {
  await ThermalPrinterModule.printBluetooth({
    payload: 'hello world',
    printerNbrCharactersPerLine: 38,
  });
} catch (err) {
  //error handling
  console.log(err.message);
}
```

## Method

Support both network and bluetooth printing for now

| Name           | Param    | Param Type                                                             | default         |
| -------------- | -------- | ---------------------------------------------------------------------- | --------------- |
| printTcp       | `config` | `Partial<PrintTcpInterface> & Pick<PrinterInterface, 'payload'>`       | `defaultConfig` |
| printBluetooth | `config` | `Partial<PrintBluetoothInterface> & Pick<PrinterInterface, 'payload'>` | `defaultConfig` |

## Interfaces

```ts
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
  timeout: number;
}

interface PrintBluetoothInterface extends PrinterInterface {}
```

## Config

### Default config

```ts
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
  timeout: 30000,
};
```

### Available config

| Name                        | Type      | Default           | Description                                                                  |
| --------------------------- | --------- |-------------------| ---------------------------------------------------------------------------- |
| ip                          | `string`  | `192.168.192.168` | printer ip address                                                           |
| port                        | `number`  | `9100`            | printer port                                                                 |
| payload                     | `string`  | ``                | text that you send to the printer                                            |
| autoCut                     | `boolean` | `true`            | auto cut the paper                                                           |
| openCashbox                 | `boolean` | `false`           | auto cut and kick the cashbox open                                           |
| mmFeedPaper                 | `number`  | `20`              | feed paper (millimeters)                                                     |
| printerDpi                  | `number`  | `203`             | DPI of the connected printer                                                 |
| printerWidthMM              | `number`  | `80`              | printing width in millimeters                                                |
| printerNbrCharactersPerLine | `number`  | `42`              | The maximum number of medium sized characters that can be printed on a line. |
| timeout                     | `number`  | `30000`           | the maximum time to wait before the print is canceled.                       |

## Payload

same as https://github.com/DantSu/ESCPOS-ThermalPrinter-Android/tree/3.0.1#formatted-text--syntax-guide
except for the `<img></img>` tag

place the image url directly between the img tags

### example

```js
const text =
  '[C]<img>https://via.placeholder.com/300.jpg</img>\n' +
  '[L]\n' +
  "[C]<u><font size='big'>ORDER N°045</font></u>\n" +
  '[L]\n' +
  '[C]================================\n' +
  '[L]\n' +
  '[L]<b>BEAUTIFUL SHIRT</b>[R]9.99e\n' +
  '[L]  + Size : S\n' +
  '[L]\n' +
  '[L]<b>AWESOME HAT</b>[R]24.99e\n' +
  '[L]  + Size : 57/58\n' +
  '[L]\n' +
  '[C]--------------------------------\n' +
  '[R]TOTAL PRICE :[R]34.98e\n' +
  '[R]TAX :[R]4.23e\n' +
  '[L]\n' +
  '[C]================================\n' +
  '[L]\n' +
  "[L]<font size='tall'>Customer :</font>\n" +
  '[L]Raymond DUPONT\n' +
  '[L]5 rue des girafes\n' +
  '[L]31547 PERPETES\n' +
  '[L]Tel : +33801201456\n' +
  '[L]\n' +
  "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
  "[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>\n" +
  '[L]\n' +
  '[L]\n' +
  '[L]\n' +
  '[L]\n' +
  '[L]\n';
```

## Full example

```js
import React, { useState } from 'react';
import { SafeAreaView, useColorScheme, Button, TextInput } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import ThermalPrinterModule from 'react-native-thermal-printer';

ThermalPrinterModule.defaultConfig = {
  ...ThermalPrinterModule.defaultConfig,
  ip: '192.168.100.246',
  port: 9100,
  timeout: 30000,
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [state, setState] = useState({
    text:
      '[C]<img>https://via.placeholder.com/300.jpg</img>\n' +
      '[L]\n' +
      "[C]<u><font size='big'>ORDER N°045</font></u>\n" +
      '[L]\n' +
      '[C]================================\n' +
      '[L]\n' +
      '[L]<b>BEAUTIFUL SHIRT</b>[R]9.99e\n' +
      '[L]  + Size : S\n' +
      '[L]\n' +
      '[L]<b>AWESOME HAT</b>[R]24.99e\n' +
      '[L]  + Size : 57/58\n' +
      '[L]\n' +
      '[C]--------------------------------\n' +
      '[R]TOTAL PRICE :[R]34.98e\n' +
      '[R]TAX :[R]4.23e\n' +
      '[L]\n' +
      '[C]================================\n' +
      '[L]\n' +
      "[L]<font size='tall'>Customer :</font>\n" +
      '[L]Raymond DUPONT\n' +
      '[L]5 rue des girafes\n' +
      '[L]31547 PERPETES\n' +
      '[L]Tel : +33801201456\n' +
      '[L]\n' +
      "[C]<barcode type='ean13' height='10'>831254784551</barcode>\n" +
      "[C]<qrcode size='20'>http://www.developpeur-web.dantsu.com/</qrcode>",
  });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const onPress = async () => {
    try {
      console.log('We will invoke the native module here!');
      await ThermalPrinterModule.printTcp({ payload: state.text });

      //
      // bluetooth
      // await ThermalPrinterModule.printBluetooth({ payload: state.text });
      //

      console.log('done printing');
    } catch (err) {
      //error handling
      console.log(err.message);
    }
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <TextInput
        value={state.text}
        onChangeText={(text) => setState((prev) => ({ ...prev, text }))}
      />
      <Button
        title="Click to invoke your native module!"
        color="#841584"
        onPress={onPress}
      />
    </SafeAreaView>
  );
};

export default App;
```

## Tested devices

- Epson TM-T82
- Epson TM-T82X
- Epson TM-T88VI
- Epson TM-T20III
- Zywell
- VSC
- EPPOS

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
