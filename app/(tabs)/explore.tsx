import { Text, View } from 'tamagui'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps';
import { StyleSheet, SafeAreaView } from 'react-native';

const Paris = {
  latitude: 25.2048,
  longitude: 55.2708,
};

export default function TabTwoScreen() {
  return (
    <SafeAreaView>
      <MapView style={styles.map}>
        <Marker coordinate={Paris} />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});