import React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { Style } from '../core/Style';
import ThermalPrinter from 'react-native-thermal-printer';

const PrinterTcpComponent: React.FC = React.memo(() => {
  const [ip, setIp] = React.useState<string>('192.168.1.42');
  const [port, setPort] = React.useState<string>('9100');
  const [result, setResult] = React.useState<string>('');

  const testPrint = React.useCallback(async () => {
    try {
      setResult('');
      await ThermalPrinter.printTcp({
        ip: ip,
        port: parseInt(port, 10),
        payload:
          "[C]<u><font size='big'>" +
          'Test success !' +
          '</font></u>\n' +
          '[L] \n' +
          '[L] \n',
        timeout: 2000,
      });
      setResult('Success !');
    } catch (e) {
      setResult('Failed !');
    }
  }, [ip, port]);

  return (
    <View>
      <Text style={Style.h1}>PrinterTcpComponent</Text>
      <TextInput
        style={[Style.input, Style.mt15]}
        onChangeText={setIp}
        value={ip}
        placeholder="IP of the printer"
        keyboardType="numeric"
      />
      <TextInput
        style={[Style.input, Style.mt15, Style.mb15]}
        onChangeText={setPort}
        value={port}
        placeholder="Port of the printer"
        keyboardType="numeric"
      />
      <Button onPress={testPrint} title="Test print" />
      <Text style={Style.mt15}>Result: {result}</Text>
    </View>
  );
});
export default PrinterTcpComponent;
