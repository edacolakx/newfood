import { View, Text,StyleSheet ,Image, Touchable, TouchableOpacity, Alert} from 'react-native'
import React, { useDebugValue, useEffect, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { setEmail, setId, setName, setSifre, setStatus, setSurname, setTelefon } from '../redux/actions'
import { useMutation, useQuery } from '@apollo/client'
import { GET_NAME, GET_RESTAURANT_BY_EMAIL, GET_USER_BY_EMAIL, LOGIN } from '../components/sorgular'
import { Icon } from '@rneui/themed'


export default function Login({navigation}) {


  const {genelResponse} = useSelector(state => state)
  
    const [email, setEmailone] = useState("")
    const [password, setPassword] = useState("")
    const [userdata, setUserData] = useState(null);
    const [isim,setIsim] = useState()
    const [soyisim,setSoyisim] = useState()

    function onEmail(tex){setEmailone(tex)}
    function onPassword(tex){setPassword(tex)}
    const dispatch=useDispatch()

    const [getUser] = useMutation(LOGIN)

    function sifremiunutum() {
        navigation.navigate("Forgotpassword")
    }

    function userlogin() {
      if (email) {
        getUser({ variables: { email: email , sifre: password } }).then(result => {
          if (result.error) {
            
          } else {
            console.log("object",result.data.login.kullanici.hesapTipi)
            dispatch(setStatus(result.data.login.kullanici.hesapTipi))
            dispatch(setName(result.data.login.kullanici.isim))
            dispatch(setSurname(result.data.login.kullanici.soyisim))
            dispatch(setSifre(result.data.login.kullanici.sifre))
            dispatch(setEmail(result.data.login.kullanici.email))
            dispatch(setId(result.data.login.kullanici.id))
            dispatch(setTelefon(result.data.login.kullanici.telefonNo))

            console.log("soyisim",result.data.login.kullanici.telefonNo)
            navigation.navigate("Root")
            
          }
      }).catch(error => {
          console.log("Error fetching data:", error);
          {
            Alert.alert("Hata", "Kullanıcı adı veya şifre hatalı")
          }
      });
      }
        
    }

    function userregister() {
        navigation.navigate("Register")
    }



  return (
    <View style={{alignItems:"center",backgroundColor:"#EEEDED",flex:1}}>
     <Icon name='fastfood' size={100} style={{marginBottom:40,marginTop:100}}></Icon>

        <TextInput onChangeText={onEmail} label={"Email "} style={styles.input} textColor='black'></TextInput>
        <TextInput onChangeText={onPassword} label={"Şifre "} style={styles.input} secureTextEntry></TextInput>
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