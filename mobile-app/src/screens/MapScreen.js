import * as React from 'react';
import MapView, { Circle, Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
        initialRegion={{
          latitude: 14.998796,
          longitude: 120.877476,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015
        }} >
        <Marker
          coordinate={{
            latitude: 14.998796,
            longitude: 120.877476
          }}
          title="Jb Regore"
          description="Andito ako"
          pinColor="gold"
          draggable={true}
        >
          <Callout>
            <Text>This is a callout</Text>
          </Callout>
        </Marker>

        <Circle
          center={{
            latitude: 14.998796,
            longitude: 120.877476
          }}
          radius={5000}
        />

      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});