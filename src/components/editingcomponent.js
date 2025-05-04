import { View, Text , StyleSheet, TouchableOpacity, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, IconButton, Modal, Portal, TextInput } from 'react-native-paper'
import { Icon } from '@rneui/themed'
import { useMutation } from '@apollo/client';
import { USER_UPDATE } from './sorgular';
import { useSelector } from 'react-redux';

 function CustomCard(props) {
    const [visible, setVisible] = React.useState(false);
    const [isim,setName]=useState('')
    const [soyisim,setSurname]=useState('')
    const [eposta,setEmail]=useState('')
    const [telefon,setPhone]=useState('')
    const [sifre,setPassword]=useState('')
    const [oldPassword,setOldPassword]=useState('')

    function onName(tex){setName(tex)}
    function onSurname(tex){setSurname(tex)}
    function onEmail(tex){setEmail(tex)}
    function onPhone(tex){setPhone(tex)}
    function onPassword(tex){setPassword(tex)}
    function onOldPassword(tex){oldPassword(tex)}

      function showModal(){
          setVisible(true)
      }

      const hideModal = () => setVisible(false);
      function ExitIcon(){
        return(
          <View> 
            <TouchableOpacity onPress={hideModal}>
              <Icon name='clear' size={50} style={{alignSelf:"flex-end",marginBottom:100}}></Icon>
            </TouchableOpacity>
           </View>
        )
      }

      const {genelResponse}=useSelector(state=>state)
      const [userupdate] = useMutation(USER_UPDATE)

      async function nameupdate(id,name,surname,email,phone,password,hesaptipi) {
        console.log(id,name,surname,email,phone,password,hesaptipi)
        try {
        const {data} = await userupdate({variables:{
          id:id,
          isim:name,
          soyisim:surname,
          email:email,
          telefon_no:phone,
          sifre:password,
          hesapTipi:hesaptipi
        }})
        console.log(data)
      } catch (error) {
          console.log(error)
        }
        hideModal()
      }

    return (
      <View style={styles.card}>
        <View>
  
          <Text style={styles.headline}>{props.headline}</Text>
          <Text style={styles.infoo}>{props.infoo}</Text>
        </View>
          <TouchableOpacity style={{marginRight:10,marginTop:10}} onPress={showModal}>
          <Icon name='edit' />
          </TouchableOpacity>
          <Portal>
          <Modal visible={visible} dismissable={false}  style={styles.modal}>
             {
              props.headline == "İsim"?(
                <View style={styles.editview}>
                <ExitIcon></ExitIcon>
                <TextInput style={styles.input} onChangeText={onName} placeholder='Adınızı yazınız' label='Ad' mode='outlined'></TextInput>
                <TextInput style={styles.input} onChangeText={onSurname} placeholder='Soyadınzı yazınız' label='Soyad' mode='outlined' ></TextInput>
                <Button onPress={()=>{nameupdate(parseInt(genelResponse.id),isim,soyisim,props.email,props.telefon,props.sifre,"Kullanici")}}>Güncelle</Button>
                </View>
              ):(props.headline == "Email"?(
                <View style={styles.editview}>
                    <ExitIcon></ExitIcon>
                    <TextInput style={styles.input} onChangeText={onEmail} placeholder='Email yazınız' label='Email' mode='outlined' value={props.infoo}></TextInput>
                    <Button onPress={()=>{nameupdate(parseInt(genelResponse.id),props.name,props.surname,eposta,props.telefon,props.sifre,"Kullanici")}}>Email Onay Kodu Gönder</Button>
                </View>
              ):(
                props.headline == "Şifre" ? (
                    <View style={styles.editview}>
                        <ExitIcon/>
                        <TextInput style={styles.input} onChangeText={onOldPassword} placeholder='Mevcut Şifrenizi Yazınız' label='Eski Şifre' mode='outlined' ></TextInput>
                        <TextInput style={styles.input} onChangeText={onPassword} placeholder='Yeni Şifrenizi Yazınız' label='Yeni Şifre' mode='outlined'></TextInput>
                    <Button onPress={()=>{
                      if(oldPassword==props.sifre){

                        nameupdate(parseInt(genelResponse.id),props.name,props.surname,props.email,props.telefon,sifre,"Kullanici")
                      }else{
                        Alert.alert("Hata","Mevcut Şifrenizi Yanlış Girdiniz")
                      }
                    } }>Güncelle</Button>
                    </View>
                ):(
                    props.headline == "Telefon" ? (
                        <View style={styles.editview}>
                            <ExitIcon/>
                            <TextInput style={styles.input} onChangeText={onPhone} placeholder='Yeni Telefon Numarasını Yazınız' label='Telefon' mode='outlined' value={props.infoo}></TextInput>
                    <Button onPress={()=>{
                      nameupdate(parseInt(genelResponse.id),props.name,props.surname,props.email,telefon,props.sifre,"Kullanici")
                    }}>Onay Kodu Gönder</Button>
                        </View>
                    ):(<Text>Öyle Bişey Yok</Text>)
                    )
                )
              )
             }
          </Modal>
        </Portal>
      </View>
    )
  }
  export default CustomCard
  


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
    },
    infoo:{
      fontWeight:"bold"
    }
  })