import * as React from 'react';

import { ScrollView, View } from 'react-native';
import PrinterTcpComponent from './components/PrinterTcpComponent';
import { Style } from './core/Style';
import PrinterBluetoothComponent from './components/PrinterBluetoothComponent';

export default function App() {
  return (
    <ScrollView contentContainerStyle={Style.p15}>
      <PrinterTcpComponent />
      <View style={[Style.borderTopBlack, Style.mv15]} />
      <PrinterBluetoothComponent />
    </ScrollView>
  );
}
