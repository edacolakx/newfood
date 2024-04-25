import { View, Text , StyleSheet, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, IconButton, Modal, Portal, TextInput } from 'react-native-paper'
import { Icon } from '@rneui/themed'

 function CustomCard(props) {
    const [visible, setVisible] = React.useState(false);
     
      function showModal(){
          setVisible(true)
      }
      function ExitIcon(){
        const hideModal = () => setVisible(false);
        return(
          <View> 
                        <TouchableOpacity onPress={hideModal}>
                        <Icon name='clear' size={50} style={{alignSelf:"flex-end",marginBottom:100}}></Icon>
                        </TouchableOpacity>
                      </View>
        )
      }
    return (
      <View style={styles.card}>
        <View>
  
          <Text style={styles.headline}>{props.headline}</Text>
          <Text>{props.info}</Text>
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
                <TextInput style={styles.input} placeholder='Adınızı yazınız' label='Ad' mode='outlined'></TextInput>
                <TextInput style={styles.input} placeholder='Soyadınzı yazınız' label='Soyad' mode='outlined'></TextInput>
                <Button onPress={()=>{}}>Güncelle</Button>
                </View>
              ):(props.headline == "Email"?(
                <View style={styles.editview}>
                    <ExitIcon></ExitIcon>
                    <TextInput style={styles.input} placeholder='Email yazınız' label='Email' mode='outlined'></TextInput>
                    <Button onPress={()=>{}}>Email Onay Kodu Gönder</Button>
                </View>
              ):(
                props.headline == "Şifre" ? (
                    <View style={styles.editview}>
                        <ExitIcon/>
                        <TextInput style={styles.input} placeholder='Mevcut Şifrenizi Yazınız' label='Eski Şifre' mode='outlined'></TextInput>
                        <TextInput style={styles.input} placeholder='Yeni Şifrenizi Yazınız' label='Yeni Şifre' mode='outlined'></TextInput>
                    <Button onPress={()=>{}}>Güncelle</Button>
                    </View>
                ):(
                    props.headline == "Telefon" ? (
                        <View style={styles.editview}>
                            <ExitIcon/>
                            <TextInput style={styles.input} placeholder='Yeni Telefon Numarasını Yazınız' label='Telefon' mode='outlined'></TextInput>
                    <Button onPress={()=>{}}>Onay Kodu Gönder</Button>
                        </View>
                    ):(
                        props.headline == "Doğum Günü" ? (
                            <View style={styles.editview}>
                                <ExitIcon/>
                                <TextInput style={styles.input} placeholder='Email yazınız' label='DG' mode='outlined'></TextInput>
                    <Button onPress={()=>{}}>Güncelle</Button>
                            </View>
                        ):(<Text>Öyle Bişey Yok</Text>)
                    )
                )
              ))
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
    }
  })