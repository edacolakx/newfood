import { View, Text , StyleSheet, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, IconButton, Modal, Portal, TextInput } from 'react-native-paper'
import { getUserInfo } from '../components/axiosfunction'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Icon } from '@rneui/themed'
import CustomCard from '../components/editingcomponent'




export default function Profil() {
  const {genelResponse}=useSelector(state=>state)
  console.log("isim",genelResponse.name)
  const [name,setName]=useState('')
  const [surname,setSurname]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')
  const [birthday,setBirthday]=useState('')


  return (
    <View style={styles.view}>
      <CustomCard headline={"İsim"} infoo={genelResponse.name+" "+genelResponse.surname} email={genelResponse.email} sifre={genelResponse.sifre} telefon={genelResponse.telefon}/>
      <CustomCard headline={"Email"} infoo={genelResponse.email} name={genelResponse.name} surname={genelResponse.surname} sifre={genelResponse.sifre} telefon={genelResponse.telefon}/>
      <CustomCard headline={"Şifre"} infoo={genelResponse.sifre} name={genelResponse.name} surname={genelResponse.surname} email={genelResponse.email} telefon={genelResponse.telefon}/>
      <CustomCard headline={"Telefon"} infoo={genelResponse.telefon} name={genelResponse.name} surname={genelResponse.surname} email={genelResponse.email} sifre={genelResponse.sifre}/>
      <CustomCard headline={"Doğum Günü"} infoo={birthday}/>
    </View>
  )
}

const styles=StyleSheet.create({
  card:{
      backgroundColor:"#DC8686",
      flex:1,
      marginBottom:10,
      flexDirection:"row",
      justifyContent:"space-between"
  },
  view:{
    justifyContent:"space-around",
    flex:1
  },
  headline:{
    fontWeight:"bold",
    fontSize:25,
    marginLeft:10,
    marginTop:5
  },
  modal:{
    backgroundColor:"white",
  },
  input:{
    backgroundColor:"white",
    width:"90%",
    alignSelf:"center",
    marginBottom:20
  },
  editview:{
    justifyContent: 'flex-start', 
    alignItems: 'flex-end' ,
    height:"100%"
  }
})

 