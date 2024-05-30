import { View, Text , StyleSheet, SafeAreaView, ScrollView} from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { Button } from 'react-native-paper'

export default function Profilupdateres() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [kapanis,setKapanis] = useState('')
  const [puan,setPuan] = useState()
  const [resim,setResim] = useState('')
  const [min,setMin] = useState()
  const [acilis,setAcilis] = useState()
  const [category,setCategory] = useState()
  const [hesaptipi,setHesaptipi] = useState()

  function onName(tex){setName(tex)}
  function onEmail(tex){setEmail(tex)}
  function onPassword(tex){setPassword(tex)}
  function onPhone(tex){setPhone(tex)}
  function onAddress(tex){setAddress(tex)}
  function onKapanis(tex){setKapanis(tex)}
  function onPuan(tex){setPuan(tex)}
  function onResim(tex){setResim(tex)}
  function onMin(tex){setMin(tex)}
  function onAcilis(tex){setAcilis(tex)}
  function onCategory(tex){setCategory(tex)}
  function onHesaptipi(tex){setHesaptipi(tex)}

  return (
    <View>
      <ScrollView>
      <TextInput placeholder='İsim' onChangeText={onName} style={styles.input}/>
      <TextInput placeholder='email' onChangeText={onEmail} style={styles.input}/>
      <TextInput placeholder='sifre' onChangeText={onPassword} style={styles.input}/>
      <TextInput placeholder='telefon' onChangeText={onPhone} style={styles.input}/>
      <TextInput placeholder='adres' onChangeText={onAddress} style={styles.input}/>
      <TextInput placeholder='kapanis' onChangeText={onKapanis} style={styles.input}/>
      <TextInput placeholder='puan' onChangeText={onPuan} style={styles.input}/>
      <TextInput placeholder='resim' onChangeText={onResim} style={styles.input}/>
      <TextInput placeholder='min' onChangeText={onMin} style={styles.input}/>
      <TextInput placeholder='acilis' onChangeText={onAcilis} style={styles.input}/>
      <TextInput placeholder='category' onChangeText={onCategory} style={styles.input}/>
      <TextInput placeholder='hesaptipi' onChangeText={onHesaptipi} style={styles.input}/>
      <Button>Güncelle</Button>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    margin: 10,
    padding: 10,
    backgroundColor:"yellow"
  }
})