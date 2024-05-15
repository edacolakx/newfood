import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const AddressToLatLng = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const address = "Çaybaşı, 1336. Sk. No:3, 07100 Muratpaşa/Antalya, Türkiye";
  const API_KEY = "AIzaSyChaPLZWZcaMntXcfsAgdXfaKt4DF7PBkA";

  useEffect(() => {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setLatitude(lat);
          setLongitude(lng);
        } else {
          console.error("Geocode API returned no results.");
        }
      })
      .catch(error => {
        console.error("Error fetching geocode data:", error);
      });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {latitude && longitude ? (
        <Text>Latitude: {latitude}, Longitude: {longitude}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default AddressToLatLng;
