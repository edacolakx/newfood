import { View, Text,StyleSheet ,Image, Touchable, TouchableOpacity} from 'react-native'
import React, { useDebugValue, useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { setEmail, setName, setStatus } from '../redux/actions'
import { useMutation, useQuery } from '@apollo/client'
import { GET_NAME, GET_RESTAURANT_BY_EMAIL } from '../components/sorgular'
import { Icon } from '@rneui/themed'


export default function Login({navigation}) {


  const {genelResponse} = useSelector(state => state)
  
    const [email, setEmailone] = useState("")
    const [password, setPassword] = useState("")
    const [name,setName] = useState("")
    const [phone,setPhone] = useState("")
    const [address,setAddress] = useState("")
    const [image,setImage] = useState("")
    const [minTutar,setMinTutar] = useState()
    const [category,setCategory] = useState("")
    const [puan,setPuan] = useState()
    const [acilisSaati,setAcilisSaati] = useState()
    const [kapanisSaati,setKapanisSaati] = useState()
    const [id,setId]=useState()
    const [resturun,setResturun]= useState([])

    function onEmail(tex){setEmailone(tex)}
    function onPassword(tex){setPassword(tex)}
    const dispatch=useDispatch()
    const[getRes] =useMutation(GET_RESTAURANT_BY_EMAIL)

    function sifremiunutum() {
        navigation.navigate("Forgotpassword")
    }



    function userlogin() {
      dispatch(setStatus("restorant"))
      console.log(email)
      dispatch(setEmail(email))
      try{
      const {data} =  getRes({variables:{
          email:email
        }})
        console.log("restoranr",data)
      }
      catch(error){
        console.log(error)
      }
        navigation.navigate("Root")
    }


    function userregister() {
        navigation.navigate("Register")
    }
  return (
    <View style={{alignItems:"center",backgroundColor:"#EEEDED",flex:1}}>
     <Icon name='fastfood' size={100} style={{marginBottom:40,marginTop:100}}></Icon>

        <TextInput onChangeText={onEmail} label={"Email "} style={styles.input} textColor='black'></TextInput>
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