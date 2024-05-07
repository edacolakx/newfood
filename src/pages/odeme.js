import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

// Geocoding servisi için API anahtarını ayarla
Geocoder.init("AIzaSyChaPLZWZcaMntXcfsAgdXfaKt4DF7PBkA");

export default function MapScreen() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Koordinatları alıp adres bilgisine dönüştürme fonksiyonu
  const handlePress = async (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
    
    try {
      const addressResponse = await Geocoder.from(coordinate.latitude, coordinate.longitude);
      const address = addressResponse.results[0].formatted_address;
      setSelectedAddress(address);
      console.log(address)
    } catch (error) {
      console.error('Adres dönüştürme hatası:', error);
    }
  };
  const handleMarkerPress = async (event) => {
    const { coordinate } = event.nativeEvent;

    try {
      const addressResponse = await Geocoder.from(coordinate.latitude, coordinate.longitude);
      const address = addressResponse.results[0].formatted_address;
      setSelectedAddress(address);
      console.log(address)
    } catch (error) {
      console.error('Adres dönüştürme hatası:', error);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        onPress={handlePress}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} onPress={handlePress}/>
        )}
      </MapView>
      <View style={{ padding: 20 }}>
        <Text style={{color:"black"}}>Seçilen Adres:</Text>
        <Text style={{color:"black"}}>{selectedAddress || 'Adres bulunamadı'}</Text>
      </View>
    </View>
  );
}
