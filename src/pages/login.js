import { View, Text,StyleSheet ,Image, Touchable, TouchableOpacity} from 'react-native'
import React, { useDebugValue, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { setName, setStatus } from '../redux/actions'
export default function Login({navigation}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function onEmail(tex){setEmail(tex)}
    function onPassword(tex){setPassword(tex)}
    const dispatch=useDispatch()
    function sifremiunutum() {
        navigation.navigate("Forgotpassword")
    }

    const kullanicilar=[
      {
        isim:"Eda Çolak",
        email:"edaacolakk1907@gmail.com",
        şifre : 1234,
        telefon: 5064062114,
        dg:"05-04-2002",
        status:"müşteri"
      },
      {
        isim:"Mehmet Kuru",
        email:"mehmetkuru0777@gmail.com",
        şifre : 1234,
        telefon: 5347771441,
        dg:"23-10-2000",
        status:"restorant"
      },
    ]

    function userlogin() {
      dispatch(setName(email))
      dispatch(setStatus("müşteri"))
      navigation.navigate("Root")
    }

    function userregister() {
        navigation.navigate("Register")
    }
  return (
    <View style={{alignItems:"center",backgroundColor:"#EEEDED",flex:1}}>
      <Image
               style={{ width: 90, height: 90 ,marginBottom:30,marginTop:100}}
               source={{
                   uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}/>

        <TextInput onChangeText={onEmail} label={"Email "} style={styles.input}></TextInput>
        <TextInput onChangeText={onPassword} label={"Şifre "} style={styles.input}></TextInput>
        <TouchableOpacity onPress={sifremiunutum} style={{flexDirection:"row-reverse",marginRight:170,marginBottom:30}}>
          <Text style={{color:"black"}}>Şifrenizi mi unuttunuz?</Text>
        </TouchableOpacity>
        <Button onPress={userlogin} mode={"elevated"} style={styles.button} labelStyle={{color:"white"}}>Giriş Yap</Button>
        
        <View style={{flexDirection:"row"}}>
        <Text style={{color:"black"}}>Bir hesabınız yoksa </Text>
        <TouchableOpacity>
          <Text onPress={userregister} style={{color:"red"}}>kaydolun</Text>
        </TouchableOpacity>
        </View>

    </View>
  )
}

const styles=StyleSheet.create({
  input:{
    marginBottom:10,
    width:"80%",
    alignSelf:"center",
    backgroundColor:"white" 
  },
  button:{
    marginBottom:10,
    width:"80%",
    backgroundColor:"#E21818",
    
  }
})