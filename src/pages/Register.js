import { View, Text,StyleSheet, useWindowDimensions, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { SelectList } from 'react-native-dropdown-select-list'
import { useMutation } from '@apollo/client'
import { KAYDOL } from '../components/sorgular'
import { Icon } from '@rneui/themed'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message'

export default function Register({navigation}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [selected, setSelected] = React.useState("");
    const [repassword,setRepassword]=useState("")
    const [telefon,setTelefon]=useState("")

    function onEmail(tex){setEmail(tex)}
    function onPassword(tex){setPassword(tex)}
    function onRepassword(tex){setRepassword(tex)}
    function onName(tex){setName(tex)}
    
    function onSurname(tex){setSurname(tex)}
    function onTelefon(tex){setTelefon(tex)}
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

     function validateEmail(email) {
      // Email için bir regex kullanarak doğrulama yapılıyor
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
    const [kaydol]=useMutation(KAYDOL)

    async function kaydolbuton(){
      if (password!=repassword || email == "" || password == "" || repassword == "" || name == "" || surname == "" ||telefon=="" || !validateEmail(email)) {
         
        showToastError()
      }else{
          
          if (selected == "Restoran"){
            const {data} = await kaydol({variables:{
              email:email,
              hesapTipi:selected,
              isim:name,
              sifre:password,
              soyisim:surname,
              telefon_no:telefon
            }})
            navigation.navigate("Restoranregister",{
              eposta:email,
              password:password,
              isim:name,
              soyisim:surname,
              telefon_no:telefon
            })
          }else{
            try {
                const {data} = await kaydol({variables:{
                  email:email,
                  hesapTipi:selected,
                  isim:name,
                  sifre:password,
                  soyisim:surname,
                  telefon_no:telefon
                }})
                console.log('Kaydol başarılı', data.kaydol);
                navigation.navigate("Login")
                showToastSucces()
              } catch (error) {
                console.log(error)
              }
          }
      }
  }
    const data = [
      {key:'1', value:'Kullanici' },
      {key:'2', value:'Restoran'},
  ]
  return (
    <View style={{backgroundColor:"white",flex:1}}>

      <TextInput style={{
    width:"90%",
    marginTop:10,
    alignSelf:"center",
    backgroundColor:"#FFB9B9", marginTop:100
  }} mode='outlined' onChangeText={onEmail} label={"Email"}></TextInput>
      <TextInput style={styles.input} mode='outlined' onChangeText={onPassword} label={"Şifre"} secureTextEntry></TextInput>
      <TextInput style={styles.input} mode='outlined' onChangeText={onRepassword} label={"Tekrar Şifre"} secureTextEntry></TextInput>
      <TextInput style={styles.input} mode='outlined' onChangeText={onName} label={"İsim"}></TextInput>
      <TextInput style={styles.input} mode='outlined' onChangeText={onSurname} label={"Soyisim"}></TextInput>
      <TextInput style={styles.input} mode='outlined' onChangeText={onTelefon} label={"Telefon"}></TextInput>
      <SelectList
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
        placeholder='Ürünün Kategorisi'
        search={false}
        dropdownShown={false}
        style={styles.input}
    />
      <Button onPress={kaydolbuton} style={styles.buton} textColor='white'>Kaydol</Button>
      <Toast config={toastConfig}></Toast>
    </View>
  )
}

const styles = StyleSheet.create({
  input:{
    width:"90%",
    marginTop:10,
    alignSelf:"center",
    backgroundColor:"#FFB9B9"
  },
  dropdown:{
    width:"90%",
    alignSelf:"center",
    backgroundColor:"#FFB9B9"
  },
  buton:{
    backgroundColor:"red",
    marginTop:10,
    width:"90%",
    alignSelf:"center"
  }
})