import { View, Text ,StyleSheet, Image} from 'react-native'
import React, { useState } from 'react'
import { Button, Modal, Portal, TextInput } from 'react-native-paper'
import { SelectList } from 'react-native-dropdown-select-list'
import { Icon } from '@rneui/themed'
import Harita from '../restorantpages/comps/harita'
import { useSelector } from 'react-redux'
import { RESTAURANT_REGISTER } from '../components/sorgular'
import { useMutation } from '@apollo/client'
import { launchImageLibrary } from 'react-native-image-picker'

export default function Restoranregister() {

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
const veri={
  name:name,
        email:email,
        adres:adresrsrs,
        category:selected,
        minTutar:min,
        acilisSaati:parseFloat("10.0"),
        kapanisSaati:parseFloat("10.0"),
        puan:0,
        resim:resim,
        telefon:telefon,
        sifre:sifre,
        hesaptipi:"Restoran"
}
console.log("veri",veri)
async function kaydolbuton(){
    try {
      const {data} = await restorankaydol({variables:{
        name:name,
        email:email,
        adres:adresrsrs,
        category:selected,
        minTutar:parseFloat(min),
        acilisSaati:acilis,
        kapanisSaati:kapanis,
        puan:parseFloat(0),
        resim:resim,
        telefon:telefon,
        sifre:sifre,
        hesapTipi:"Restoran"
      }})
      console.log(data)
      console.log('Kaydol başarılı', data.restorankaydol);
    } catch (error) {
      console.log(error)
    }
}

  return (
    <View>
      <TextInput style={styles.input} textColor='black' mode='outlined' onChangeText={onName} label={"Restoranınızın İsmi"}></TextInput>
      <TextInput style={styles.input} textColor='black' mode='outlined' onChangeText={onEmail} label={"Email"}></TextInput>
      <TextInput style={styles.input} textColor='black' mode='outlined' onChangeText={onMin} label={"Minimum Tutar"}></TextInput>
      <TextInput style={styles.input} textColor='black' mode='outlined' onChangeText={onAcilis} label={"Açılış Saati"}></TextInput>
      <TextInput style={styles.input} textColor='black' mode='outlined' onChangeText={onKapanis} label={"Kapanış Saati"}></TextInput>
      <TextInput style={styles.input} textColor='black' mode='outlined' onChangeText={onSifre} label={"Şifre"}></TextInput>
      <TextInput style={styles.input} textColor='black' mode='outlined' onChangeText={onResifre} label={"Tekrar Şifre"}></TextInput>
      <TextInput style={styles.input}  theme={{
         colors: {
            primary: 'blue', // Etiketin rengini buradan ayarlayabilirsiniz
          },
      }} mode='outlined' onChangeText={onTelefon} label={"Telefon Numarası"}></TextInput>

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
    <Button onPress={resima}>Kaydol</Button>
    <Image source={{uri:resim}} style={{width:100,height:100}}></Image>
    <Portal>
        <Modal visible={modal} onDismiss={hideModal} dismissableBackButton={true} style={{backgroundColor:"white",flex:1,height:"100%",borderWidth:2}}>
            <Harita hideModal={hideModal}></Harita>
        </Modal>
    </Portal>
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