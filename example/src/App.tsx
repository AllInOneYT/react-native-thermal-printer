import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
// import ThermalPrinter from 'react-native-thermal-printer';

export default function App() {
  // const [result, setResult] = React.useState<number | undefined>();

  React.useEffect(() => {
    // ThermalPrinter.printTcp('')
  }, []);

  return (
    <View style={styles.container}>
      <Text>TODO: Create example app for testing</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
