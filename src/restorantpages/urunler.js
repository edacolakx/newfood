import { View, Text, FlatList , StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Modal, Portal, TextInput } from 'react-native-paper'
import { SelectList } from 'react-native-dropdown-select-list'

export default function Urunler({route}) {

    const {resturun} = route.params
    const [model,setModel] = useState(false)
    function showModal(){setModel(true)}
    function hideModal(){setModel(false)}

    const [name,setName] = useState("")
    const [image,setImage] = useState("")
    const [detay,setDetay] = useState("")
    const [category,setCategory] = useState("")
    const [fiyat,setFiyat] = useState("")
    const [id,setId] = useState("")

    function onName(text){setName(text)}
    function onImage(text){setImage(text)}
    function onDetay(text){setDetay(text)}
    function onCategory(text){setCategory(text)}
    function onFiyat(text){setFiyat(text)}
    function onId(text){setId(text)}

    const datas = [
      {key:'1', value:'Yemek' },
      {key:'2', value:'İçecek'},
      {key:'3', value:'Tatlı'},
  ]
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
      setImage(fileName)
    })
  }
    const renderItem = ({item}) => {
        return (
            <View style={styles.view}>
                <Avatar.Image size={50} source={{uri: item.image}}></Avatar.Image>
                <View>
                <Text>{item.name}</Text>
                <Text>{item.detay}</Text>
                <Text>{item.category.name}</Text>
                </View>
                <Text>{item.fiyat}</Text>
                <Button onPress={showModal}>Güncelle</Button>
                <Portal>

                <Modal visible={model} onDismiss={hideModal} style={styles.modal}>
                  <Text>{item.name}</Text>
                  <TextInput style={styles.input} onChangeText={onName} placeholder='İsim'></TextInput>
                  <TextInput style={styles.input} onChangeText={onDetay} placeholder='Detay'></TextInput>
                  <TextInput style={styles.input} onChangeText={onFiyat} placeholder='Fiyat'></TextInput>
                  <SelectList
        setSelected={(val) => setCategory(val)} 
        data={datas} 
        save="value"
        placeholder='Ürünün Kategorisi'
        search={false}
        dropdownShown={false}
    />
    <Button onPress={resimEkle}>RESİM</Button>
    <Button>Güncelle</Button>
                </Modal>
                </Portal>
            </View>
        )
    }

  return (
    <View>
      <FlatList data={resturun} renderItem={renderItem}></FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  view:{
    flexDirection:"row",
    backgroundColor:"red",
    padding:10,
    margin:10,
    justifyContent:"space-between"
  },
  modal:{
    backgroundColor:"white",
  },
  input:{
    backgroundColor:"yellow",
    padding:10,
    margin:10
  }
})