import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import { SelectList } from 'react-native-dropdown-select-list'

export default function Register({navigation}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [selected, setSelected] = React.useState("");


    function onEmail(tex){setEmail(tex)}
    function onPassword(tex){setPassword(tex)}
    function onRepassword(tex){setRepassword(tex)}
    function onName(tex){setName(tex)}
    function onSurname(tex){setSurname(tex)}

    
  
  const data = [
      {key:'1', value:'Restorant' },
      {key:'2', value:'Bireysel'}
  ]

    function kaydol() {
        navigation.navigate("Login")
    }
    
  return (
    <View style={{backgroundColor:"black",flex:1}}>
      <TextInput onChangeText={onEmail} label={"Email"}></TextInput>
      <TextInput onChangeText={onPassword} label={"Şifre"}></TextInput>
      <TextInput onChangeText={onRepassword} label={"Tekrar Şifre"}></TextInput>
      <TextInput onChangeText={onName} label={"İsim"}></TextInput>
      <TextInput onChangeText={onSurname} label={"Soyisim"}></TextInput>

      <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
        placeholder='Hesap türü seçin'
        search={false}
        dropdownShown={false}
    />
      <Button onPress={kaydol}>Kaydol</Button>
    <Text >{selected}</Text>
    </View>
  )
}