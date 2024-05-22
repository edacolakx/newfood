import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { Modal, Portal } from 'react-native-paper'
import MapView, { Marker } from 'react-native-maps'
import Geocoder from 'react-native-geocoding';
import { useDispatch } from 'react-redux';
import { setAdresforResReg } from '../../redux/actions';

export default function Harita(props) {

    const dispatch = useDispatch();

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState("");
    const handlePress = async (event) => {
        const { coordinate } = event.nativeEvent;
        setSelectedLocation(coordinate);
        console.log(coordinate)
        try {
            console.log("object")
          const addressResponse = await Geocoder.from(coordinate.latitude, coordinate.longitude);
          const address = addressResponse.results[0].formatted_address;
          console.log("Adres",address)
          dispatch(setAdresforResReg(address))
          Alert.alert(address,'Adresinizin doğru olduğuna emin misiniz?', [
            {
              text:"Evet",
              onPress:()=>props.hideModal()
            },
            {
              text:"Hayır",
              onPress:()=>console.log("object")
            }
          ]);
         
    
        } catch (error) {
          console.error('Adres dönüştürme hatası:', error);
        }
      };
    
  return (
    <View style={{borderWidth:2}}>
      
          <MapView
              style={{ flex: 1,borderWidth:500 ,height:500}}
              onPress={handlePress}
              initialRegion={{
                latitude: 36.89992393390362,
                longitude: 30.645422190427777,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} onPress={handlePress}/>
        )}
         </MapView>
       
    </View>
  )
}