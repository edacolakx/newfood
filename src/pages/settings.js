import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import { useMutation } from '@apollo/client'
import { DELETE_RESTAURANT, DELETE_USER, GET_RESTAURANT_BY_EMAIL } from '../components/sorgular'
import { useSelector } from 'react-redux'

export default function Settings({navigation}) {
  const [deleteresta] = useMutation(DELETE_RESTAURANT)
  const [deleteuser] = useMutation(DELETE_USER)
  const [id,setID]=useState()

  const [getid] = useMutation(GET_RESTAURANT_BY_EMAIL)

  
  
  const {genelResponse} = useSelector(state=>state)
  function getidres(){
    const {data} =  getid({variables:{email:genelResponse.email}}).then(result=>{
      console.log("nedne",result.data.getRestoran.restoran.id)
      setID(parseInt(result.data.getRestoran.restoran.id))}).catch(err=>console.log(err))
      console.log(data)
  }
  getidres()
  function deleteres() {
    getidres()
    console.log(genelResponse.id)
    const { data } = deleteresta({
      variables: { id: id }
    })
  }
  function deleteuserr() {
    console.log(genelResponse.id)
    const { data } = deleteuser({
      variables: { id: genelResponse.id }
    })
  }

  function del(){
    if(genelResponse.hesapTipi=="restoran"){
      deleteres()
      deleteuserr()
    }else{
      deleteuserr()
    }
    navigation.navigate("Login")
  }
  return (
    <View>
      <Button onPress={del}>Sil</Button>
      <Button onPress={()=>{navigation.navigate("Login")}}>Çıkış yap</Button>
    </View>
  )
}