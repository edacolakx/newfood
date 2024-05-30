import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { launchImageLibrary } from 'react-native-image-picker'
import { SelectList } from 'react-native-dropdown-select-list'
import { useMutation } from '@apollo/client'
import { GET_RESTAURANT_BY_EMAIL, URUN_EKLE } from '../components/sorgular'
import { useSelector } from 'react-redux'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'

export default function Urunekle() {
    const [name, setName] = useState('')
    const [detay,setDetay] = useState("")
    const [fiyat,setFiyat] = useState()
    const [kategori,setKategori] = useState()
    const [restoran,setRestoran] = useState()
    const [resim,setResim] = useState("")
    const [id,setID]=useState()

    function onName(tex){setName(tex)}
    function onDetay(tex){setDetay(tex)}
    function onFiyat(tex){setFiyat(tex)}
    
    const resimEkle=()=>{
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
          text2: 'Başar ıyla Kaydoldunuz',
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
      const datas = [
        {key:'1', value:'Yemek' },
        {key:'2', value:'İçecek'},
        {key:'3', value:'Tatlı'},
    ]
  
    const {genelResponse} = useSelector(state=>state)
    const [addproduct]=useMutation(URUN_EKLE)
    const [getid] = useMutation(GET_RESTAURANT_BY_EMAIL)
    console.log("kategori",kategori)

    const clearInputs = () => {
      onName('');
      onDetay('');
      onFiyat('');
    }
    async function urunEkle() {

      const {data} =  getid({variables:{email:genelResponse.email}}).then(result=>{
        console.log(result.data.getRestoran.restoran.id)
        setID(result.data.getRestoran.restoran.id)}).catch(err=>console.log(err))
      console.log(name,detay,fiyat,kategori,id,resim)
      if(name=="" || detay=="" || fiyat=="" || kategori=="" || resim==""){
        showToastError()
      }  else{
      try {

            const {data} = await addproduct({variables:{
              name:name,
              detay:detay,
              image:resim,
              fiyat:parseFloat(fiyat),
              category:kategori == 'Yemek'? parseInt(1):(kategori == 'İçecek'? parseInt(2):parseInt(3)),
              restoran:parseInt(id),
            }})
            console.log(data)
            console.log('Kaydol başarılı', data.addproduct);
            clearInputs()
            showToastSucces()
          } catch (error) {
            console.log(error)
            showToastError()
          }
    }}
  return (
    <View>
        <TextInput mode='outlined' onChangeText={onName} placeholder='Ürünün ismini yazınız' value={name} style={{marginTop:10,width:"90%",alignSelf:"center"}}/>
        <TextInput mode='outlined' onChangeText={onFiyat} placeholder='Ürünün fiyatını yazınız' value={fiyat} style={{marginTop:10,width:"90%",alignSelf:"center"}}/>
        <TextInput mode='outlined' onChangeText={onDetay} placeholder='Ürünün detayını yazınız' value={detay} style={{marginTop:10,width:"90%",alignSelf:"center"}}/>
        <View style={{marginTop:10,width:"90%",alignSelf:"center"}}>

        <SelectList
        setSelected={(val) => setKategori(val)} 
        data={datas} 
        save="value"
        placeholder='Ürünün Kategorisi'
        search={false}
        dropdownShown={false}
        style={{marginTop:10,width:"90%",alignSelf:"center"}}
        />
        </View>
        <Button onPress={resimEkle} style={{backgroundColor:"red" , marginTop:10,width:"90%", alignSelf:"center"}} labelStyle={{color:"white"}}>Resim Ekle</Button>
        <Button onPress={urunEkle} style={{backgroundColor:"red" , marginTop:10,width:"90%", alignSelf:"center"}} labelStyle={{color:"white"}}>Ürünü Ekle</Button>
        <Toast config={toastConfig}></Toast>
    </View>
  )
}