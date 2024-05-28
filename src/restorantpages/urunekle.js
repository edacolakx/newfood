import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { launchImageLibrary } from 'react-native-image-picker'
import { SelectList } from 'react-native-dropdown-select-list'
import { useMutation } from '@apollo/client'
import { URUN_EKLE } from '../components/sorgular'

export default function Urunekle() {
    const [name, setName] = useState('')
    const [detay,setDetay] = useState("")
    const [fiyat,setFiyat] = useState()
    const [kategori,setKategori] = useState()
    const [restoran,setRestoran] = useState()
    const [resim,setResim] = useState("")

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

      const data = [
        {key:'1', value:'Yemek' },
        {key:'2', value:'İçecek'},
        {key:'3', value:'Tatlı'},
    ]
    const veridetay ={
              name:name,
              detay:detay,
              image:resim,
              fiyat:parseFloat(fiyat),
              category:kategori == 'Yemek'? parseInt(1):(kategori == 'İçecek'? parseInt(2):parseInt(3)),
              restoran:8,
    }
    console.log(veridetay)
    const [addproduct]=useMutation(URUN_EKLE)
    async function urunEkle() {
        try {
            const {data} = await addproduct({variables:{
              name:name,
              detay:detay,
              image:resim,
              fiyat:parseFloat(fiyat),
              category:kategori == 'Yemek'? parseInt(1):(kategori == 'İçecek'? parseInt(2):parseInt(3)),
              restoran:8,
            }})
            console.log(data)
            console.log('Kaydol başarılı', data.addproduct);
          } catch (error) {
            console.log(error)
          }
    }
  return (
    <View>
        <TextInput mode='outlined' onChangeText={onName} placeholder='Ürünün ismini yazınız'/>
        <TextInput mode='outlined' onChangeText={onFiyat} placeholder='Ürünün fiyatını yazınız'/>
        <TextInput mode='outlined' onChangeText={onDetay} placeholder='Ürünün detayını yazınız'/>
        <SelectList
        setSelected={(val) => setKategori(val)} 
        data={data} 
        save="value"
        placeholder='Ürünün Kategorisi'
        search={false}
        dropdownShown={false}
    />
        <Button onPress={resimEkle}>Resim Ekle</Button>
        <Button onPress={urunEkle}>Ürünü Ekle</Button>
    </View>
  )
}