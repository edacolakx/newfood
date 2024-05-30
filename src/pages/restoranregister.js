import { View, Text ,StyleSheet, Image} from 'react-native'
import React, { useState } from 'react'
import { Button, Modal, Portal, TextInput } from 'react-native-paper'
import { SelectList } from 'react-native-dropdown-select-list'
import { Icon } from '@rneui/themed'
import Harita from '../restorantpages/comps/harita'
import { useSelector } from 'react-redux'
import { GET_RESTAURANT_BY_EMAIL, RESTAURANT_REGISTER } from '../components/sorgular'
import { useMutation } from '@apollo/client'
import { launchImageLibrary } from 'react-native-image-picker'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'

export default function Restoranregister({route,navigation}) {

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [adres,setAdres]=useState("")
    const [category,setCategory]=useState("")
    const [min,setMin]=useState(0)
    const [acilis,setAcilis]=useState()
    const [kapanis,setKapanis]=useState()
    const [puan,setPuan]=useState(0)
    const [resim,setResim]=useState("")
    const [telefon,setTelefon]=useState("")
    const [sifre,setSifre]=useState("")
    const [resifre,setResifre]=useState("")
    const [hesaptipi,setHesaptipi]=useState("")

    function onName(tex){setName(tex)}
    function onEmail(tex){setEmail(tex)}
    function onAdres(tex){setAdres(tex)}
    function onCategory(tex){setCategory(tex)}
    function onMin(tex){setMin(tex)}
    function onAcilis(tex){setAcilis(tex)}
    function onKapanis(tex){setKapanis(tex)}
    function onPuan(tex){setPuan(tex)}
    function onResim(tex){setResim(tex)}
    function onTelefon(tex){setTelefon(tex)}
    function onSifre(tex){setSifre(tex)}
    function onResifre(tex){setResifre(tex)}
    function onHesaptipi(tex){setHesaptipi(tex)}

    const data = [
        {key:'1', value:'Burger' },
        {key:'2', value:'Pizza'},
        {key:'3', value:'Pide ve Lahmacun'},
        {key:'4', value:'Döner'},
        {key:'5', value:'Tavuk'},
        {key:'6', value:'Kahvaltı ve Börek'},
        {key:'7', value:'Waffle ve Dondurma'},
    ]
    const [selected, setSelected] = React.useState("");
    const {genelResponse} = useSelector(state=>state)
const [modal,setModal] = useState(false)
const hideModal = () => setModal(false);
console.log("adres",genelResponse.adresforres)
const [restorankaydol]=useMutation(RESTAURANT_REGISTER)
const adresrsrs=genelResponse.adresforres

const resima=()=>{
  let options={
      storageOptions:{
          path:"image",    
      }
  }
  launchImageLibrary(options,res=>{
    makas=JSON.stringify(res)
    console.log(makas)
    parsedData=JSON.parse(makas)
    console.log(parsedData)
    fileName=parsedData.assets[0].uri
    fileName=String(fileName)
    console.log("resim",fileName)
    setResim(fileName)
  })
}
const {isim,soyisim,eposta,password,telefon_no} = route.params
async function kaydolbuton(){
  if(min == "" || acilis == "" || kapanis == "" || resim == "" || adresrsrs == "") {
    showToastError()
}
  else{
    try {
      const {data} = await restorankaydol({variables:{
        name:isim + " " + soyisim,
        email:eposta,
        adres:adresrsrs,
        category:selected,
        minTutar:parseFloat(min),
        acilisSaati:acilis,
        kapanisSaati:kapanis,
        puan:parseFloat(0),
        resim:resim,
        telefon:telefon_no,
        sifre:password,
        hesapTipi:"Restoran"
      }})
      console.log(data)
      console.log('Kaydol başarılı', data.restorankaydol);
      showToastSucces()
      navigation.navigate("Login")

    } catch (error) {
      console.log(error)
    }
  }
}
const showToastError = () => {
  Toast.show({
    type: 'error',
    text1: 'Hata',
    text2: 'Eksik veya yanlış bilgi doldurdunuz',
    swipeable: true,

  });
}
const showToastSucces = () => {
  Toast.show({
    type: 'success',
    text1: 'Başarılı',
    text2: 'Başarıyla Kaydoldunuz',
    swipeable: true,

  });
}
const toastConfig={
  success:(props)=>(
    <BaseToast
    {...props}
    style={{ position: 'absolute', top: 20, right: 20, borderLeftColor: 'green', backgroundColor: 'green' }}        contentContainerStyle={{ paddingHorizontal: 300 }}
    text1Style={{
      fontSize: 17,color:"white"
    }}
    text2Style={{fontSize: 15,color:"white"}}
  />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,color:"white"
      }}
      contentContainerStyle={{backgroundColor:"red",borderLeftColor: 'red'}}
      text2Style={{
        fontSize: 15,color:"white"
      }}
    />
  ),
 }

  return (
    <View>
      <TextInput style={styles.input} textColor='black' mode='outlined' onChangeText={onMin} label={"Minimum Tutar"}></TextInput>
      <TextInput style={styles.input} textColor='black' mode='outlined' onChangeText={onAcilis} label={"Açılış Saati"}></TextInput>
      <TextInput style={styles.input} textColor='black' mode='outlined' onChangeText={onKapanis} label={"Kapanış Saati"}  theme={{
         colors: {
            primary: 'blue', // Etiketin rengini buradan ayarlayabilirsiniz
          },
      }}></TextInput>
     

      <SelectList
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
        placeholder='Restoranın Kategorisi'
        search={false}
        dropdownShown={false}
        boxStyles={styles.dropdown}
    />
    <View style={{flexDirection:"row"}}>
        <Icon onPress={()=>{
            setModal(true)
        }} name='add-location-alt' size={40} style={{marginTop:4}}></Icon>
        <TextInput style={{
      width:"86%",
      marginBottom:10,
      alignSelf:"center",
      backgroundColor:"white"
    }} mode='outlined' onChangeText={onTelefon} label={genelResponse.adresforres}></TextInput>
    </View>
    <Button onPress={kaydolbuton}>Kaydol</Button>
    <Button onPress={resima}>Resim</Button>
    <Image source={{uri:resim}} style={{width:100,height:100}}></Image>
    <Portal>
        <Modal visible={modal} onDismiss={hideModal} dismissableBackButton={true} style={{backgroundColor:"white",flex:1,height:"100%",borderWidth:2}}>
            <Harita hideModal={hideModal}></Harita>
        </Modal>
    </Portal>
    <Toast config={toastConfig}></Toast>

    </View>
  )
}


const styles = StyleSheet.create({
    input:{
      width:"90%",
      marginBottom:10,
      alignSelf:"center",
      backgroundColor:"white"
    },
    dropdown:{
        width:"90%",
        alignSelf:"center",
        backgroundColor:"#FFB9B9",
        marginBottom:10
      }
    
  })