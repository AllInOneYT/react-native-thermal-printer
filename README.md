# react-native-thermal-printer

native bridge for thermal printer

### Android Only

bridged library:
https://github.com/DantSu/ESCPOS-ThermalPrinter-Android

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

```xml
<uses-permission android:name="android.permission.INTERNET"/>
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
```

or

```js
ThermalPrinterModule.defaultConfig = {
  ...ThermalPrinterModule.defaultConfig,
  ip: '192.168.100.246',
  port: 9100,
  autoCut: false,
};
```

### Send the payload

```js
ThermalPrinterModule.printTcp({ payload: 'hello world' });
```

## Config

### Default config

```js
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
```

### Available config

| Name                        | Type      | Default           | Description                                                                  |
| --------------------------- | --------- | ----------------- | ---------------------------------------------------------------------------- |
| ip                          | `string`  | `192.168.192.168` | printer ip address                                                           |
| port                        | `number`  | `9100`            | printer port                                                                 |
| payload                     | `string`  | ``                | text that you send to the printer                                            |
| autoCut                     | `boolean` | `true`            | auto cut the paper                                                           |
| openCashbox                 | `boolean` | `false`           | auto cut and kick the cashbox open                                           |
| mmFeedPaper                 | `number`  | `20`              | feed paper (millimeters)                                                     |
| printerDpi                  | `number`  | `203`             | DPI of the connected printer                                                 |
| printerWidthMM              | `number`  | `80`              | printing width in millimeters                                                |
| printerNbrCharactersPerLine | `number`  | `42`              | The maximum number of medium sized characters that can be printed on a line. |

## Payload

same as https://github.com/DantSu/ESCPOS-ThermalPrinter-Android#formatted-text--syntax-guide
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
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import { SafeAreaView, useColorScheme, Button, TextInput } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

import ThermalPrinterModule from 'react-native-thermal-printer';

ThermalPrinterModule.defaultConfig = {
  ...ThermalPrinterModule.defaultConfig,
  ip: '192.168.100.246',
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

  const onPress = () => {
    console.log('We will invoke the native module here!');

    ThermalPrinterModule.printTcp({ payload: state.text });

    console.log('done printing');
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

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
