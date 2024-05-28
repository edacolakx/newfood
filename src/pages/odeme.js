import React, { useState } from 'react';
import { View, Text, Button, Alert,TouchableOpacity ,StyleSheet, SafeAreaView,ScrollView} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
// Geocoding servisi için API anahtarını ayarla
Geocoder.init("AIzaSyChaPLZWZcaMntXcfsAgdXfaKt4DF7PBkA");
 import { PermissionsAndroid } from 'react-native';
import { Card, DefaultTheme, Modal, Portal, Provider as PaperProvider, TextInput } from 'react-native-paper';
import {  } from 'react-native-gesture-handler';
import { Icon } from '@rneui/themed';
import { useSelector } from 'react-redux';


export default function MapScreen({navigation}) {

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [ulke,setUlke] = useState("")
  const [sehir,setSehir] = useState("")
  const [ilce,setIlce] = useState("")
   const [mahalle,setMahalle] = useState("")
   const [sokak,setSokak] = useState("")
   const [no,setNo] = useState("")
   const [postaKodu,setPostaKodu] = useState("")
   const [adresTarifi,setAdresTarifi] = useState("")
  const {genelResponse} = useSelector(state=>state)
  function onUlke(tex){setUlke(tex)
    updateDeliveryAddress()
  }
  function onSehir(tex){setSehir(tex)
    updateDeliveryAddress()
  }
  function onIlce(tex){setIlce(tex)
    updateDeliveryAddress()
  }
  function onMahalle(tex){setMahalle(tex)
    updateDeliveryAddress()
  }
  function onSokak(tex){setSokak(tex)
    updateDeliveryAddress()
  }
  function onNo(tex){setNo(tex)
    updateDeliveryAddress()
  }
  function onPostaKodu(tex){setPostaKodu(tex)
    updateDeliveryAddress()
  }
  function onAdresTarifi(tex){setAdresTarifi(tex)
    updateDeliveryAddress()
  }


  const handlePress = async (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
    console.log(coordinate)
    try {
      const addressResponse = await Geocoder.from(coordinate.latitude, coordinate.longitude);
      const address = addressResponse.results[0].formatted_address;
      Alert.alert(address,'Adresinizin doğru olduğuna emin misiniz?', [
        {
          text:"Evet",
          onPress:()=>hideModal()
        },
        {
          text:"Hayır",
          onPress:()=>console.log("object")
        }
      ]);
      const parts = address.split(',');
      const mahalle = parts[0];
      const sokakno = parts[1];
      const city = parts[2];
      const country = parts[3];
      const sokak = sokakno.split('.')[0]+sokakno.split('.')[1]
      const no =sokakno.split('.')[2]
      const postaKodu=city.split(' ')[1]
      const ilce=city.split("/")[1]
      const sehir= city.split('/')[2]
      console.log(address)

      console.log("sokak",sokak)
      console.log("mahalle",mahalle)
      console.log("country",country)
      console.log("no",no)
      console.log("postakodu",postaKodu)
      console.log("ilce",ilce)
      console.log("sehir",sehir)
      const adres = mahalle+","+sokak+','+no+','+postaKodu+','+ilce+','+sehir+','+ulke
      setSelectedAddress(adres);
      setSokak(sokak)
      setMahalle(mahalle)
      setPostaKodu(postaKodu)
      setSehir(sehir)
      setNo(no)
      setUlke(country)
      setIlce(ilce)

    } catch (error) {
      console.error('Adres dönüştürme hatası:', error);
    }
  };

  const updateDeliveryAddress = () => {
    const newAddress = `${mahalle} Mahallesi, ${sokak} Sokak No:${no}, ${ilce}, ${sehir}/${ulke} ${postaKodu}`;
    setSelectedAddress(newAddress);
  }

  
const [modal,setModal] = useState(false)
const hideModal = () => setModal(false);


  return (
    <ScrollView style={{flex:1}}>

    <View style={{ flex: 1 }}>
      
      <Portal>
           <Modal visible={modal} onDismiss={hideModal} dismissableBackButton={true} style={{backgroundColor:"white",flex:1,height:"100%",borderWidth:2}}>
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
       </Modal>
      </Portal>

          <View style={{ padding: 20 }}>
             <TouchableOpacity onPress={()=>setModal(true)}>
              <Card style={{backgroundColor:"white",height:200,marginBottom:10}}>

              <Text style={{color:"black",marginBottom:10}}>Adresinizi haritadan seçmek için tıklayın</Text>
              <View style={{flexDirection:"row",marginBottom:10}}>
                 <Icon name="pin-drop" size={25} color={"red"}></Icon>
                 <Text style={{color:"black",fontSize:20}}>Teslimat Adresi:</Text>
              </View>
             <Text style={{color:"black"}}>{selectedAddress || 'Adres bulunamadı'}</Text>

              </Card>
             </TouchableOpacity>
             <TextInput mode='outlined' style={styles.input} onChangeText={onMahalle} textColor='black' label={"Mahalle"} value={mahalle}></TextInput>
             <TextInput mode='outlined' style={styles.input} onChangeText={onNo} textColor='black' label={"No"} value={no}></TextInput>
             <TextInput mode='outlined' style={styles.input} onChangeText={onSokak} textColor='black' label={"Sokak"} value={sokak}></TextInput>

              <View style={{flexDirection:"row"}}>
                 <TextInput mode='outlined' style={styles.inputname} onChangeText={onIlce} textColor='black' label='İlçe' value={ilce}></TextInput>
                 <TextInput mode='outlined' style={styles.inputname} onChangeText={onSehir} textColor='black' label='Şehir' value={sehir}></TextInput>
              </View>
              <View style={{flexDirection:"row"}}>
                 <TextInput mode='outlined' style={styles.inputname} onChangeText={onUlke} textColor='black' label='Ülke' value={ulke}></TextInput>
                 <TextInput mode='outlined' style={styles.inputname} onChangeText={onPostaKodu} textColor='black' label='Posta Kodu' value={postaKodu}></TextInput>
              </View>
                 <TextInput mode='outlined' style={styles.input} onChangeText={onAdresTarifi} multiline={true} numberOfLines={3} textColor='black' label='Adres Tarifi'></TextInput>
                 <Card style={{backgroundColor:"white",marginTop:10}}>

                 <Text style={{color:"black",fontWeight:"bold",marginTop:3,marginLeft:3}}>Teslim Alıcak Kişinin:</Text>
                 <View style={{flexDirection:"row",justifyContent:"center"}}>
                 <TextInput mode='outlined' style={styles.inputname} onChangeText={onAdresTarifi} textColor='black' label='İsim' value={genelResponse.name}></TextInput>
                 <TextInput mode='outlined' style={styles.inputname} onChangeText={onAdresTarifi} textColor='black' label='Soyisim' value={genelResponse.surname}></TextInput>

                 </View>
                 <TextInput mode='outlined' style={styles.inputtel} onChangeText={onAdresTarifi} textColor='black' label='Telefon Numarası'></TextInput>
                 
                 </Card>
                  <Button title="Ödeme Yap" onPress={()=>
                 { Alert.alert("Siparişiniz Alındı")
                    navigation.navigate("Siparisler")
                }
                  }></Button>
          </View>
      
    </View>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  input:{
    backgroundColor:"white",
    marginBottom:5,
    marginRight:5
  },
  inputname:{
    backgroundColor:"white",
    marginBottom:5,
    marginRight:5,
    width:"50%"
  },
  inputtel:{
    backgroundColor:"white",
    marginBottom:10,
    marginRight:5,
    width:"90%",
    alignSelf:"center"
  }
})
