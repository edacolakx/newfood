import { View, Text,StyleSheet, useWindowDimensions, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { SelectList } from 'react-native-dropdown-select-list'
import { useMutation } from '@apollo/client'
import { KAYDOL } from '../components/sorgular'
import { Icon } from '@rneui/themed'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'

export default function Register({navigation}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [selected, setSelected] = React.useState("");
    const [repassword,setRepassword]=useState("")

    function onEmail(tex){setEmail(tex)}
    function onPassword(tex){setPassword(tex)}
    function onRepassword(tex){setRepassword(tex)}
    function onName(tex){setName(tex)}
    function onSurname(tex){setSurname(tex)}

    
  
  const data = [
      {key:'1', value:'Restoran' },
      {key:'2', value:'Kullanici'}
  ]

    function ksaydol() {
        navigation.navigate("Login")
    }


    const [kaydol]=useMutation(KAYDOL)
    async function kaydolbuton(){
        try {
          const {data} = await kaydol({variables:{
            email:email,
            hesapTipi:selected,
            isim:name,
            sifre:password,
            sifreDogrulama:repassword,
            soyisim:surname
          }})
          console.log('Kaydol başarılı', data.kaydol);
        } catch (error) {
          
        }
    }

  return (
    <View style={{backgroundColor:"white",flex:1}}>

      <TextInput style={styles.input} mode='outlined' onChangeText={onEmail} label={"Email"}></TextInput>
      <TextInput style={styles.input} mode='outlined' onChangeText={onPassword} label={"Şifre"}></TextInput>
      <TextInput style={styles.input} mode='outlined' onChangeText={onRepassword} label={"Tekrar Şifre"}></TextInput>
      <TextInput style={styles.input} mode='outlined' onChangeText={onName} label={"İsim"}></TextInput>
      <TextInput style={styles.input} mode='outlined' onChangeText={onSurname} label={"Soyisim"}></TextInput>

      <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
        placeholder='Hesap türü seçin'
        search={false}
        dropdownShown={false}
        boxStyles={styles.dropdown}
    />
      <Button onPress={kaydolbuton}>Kaydol</Button>
      <TouchableOpacity style={{alignSelf:"flex-end",marginTop:200,marginRight:5}} onPress={()=>{navigation.navigate("Restoranregister")}}>
        <Text style={{color:"red"}}>Restoranınızı Eklemek için Tıklayın</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input:{
    width:"90%",
    marginBottom:10,
    alignSelf:"center",
    backgroundColor:"#FFB9B9"
  },
  dropdown:{
    width:"90%",
    alignSelf:"center",
    backgroundColor:"#FFB9B9"
  }
})