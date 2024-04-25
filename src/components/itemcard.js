import { View, Text , StyleSheet,TextInput,FlatList} from 'react-native'
import React, { useState } from 'react'
import { Avatar, Badge, Button, Card, FAB, Modal, PaperProvider, Portal,  } from 'react-native-paper'
import ModalComponent from './modal';

export default function Itemcard(props) {
   

const veri=[
    {
        id:props.id,
        isim:props.isim,
        aciklama:props.description,
        fiyat:props.fiyat,
        resim:props.resim
    }
]
 const array=[]
 const [visible, setVisible] = React.useState(false);
   
    function showModal(){
        setVisible(true)
        array.push(veri)
        console.log(array)
    }

    const hideModal = () => setVisible(false);
  return (
    <View>
        <View style={styles.card}>
             <Avatar.Image size={70} style={{marginTop:10}} source={{uri:props.resim}} />

                <Button onPress={showModal}>Sepete Ekle</Button>
              <View style={{flex:1}}>
                  <Text style={{color:"black",fontWeight:"bold",fontSize:20,marginLeft:10}}>{props.isim}</Text>
                  <Text style={{color:"black",marginLeft:10,marginBottom:10,fontStyle:"italic"}}>{props.description}</Text>
                  <Text style={{color:"black",marginLeft:10,fontSize:15}}>{props.fiyat}</Text>
              </View>
              
        </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} dismissableBackButton={true} style={styles.modal}>
            <ModalComponent isim={props.isim} description={props.description} resim={props.resim} fiyat={props.fiyat}></ModalComponent>
        </Modal>
      </Portal>
    </View>
  )
}

const styles=StyleSheet.create({
    card:{
        height:100,
        backgroundColor:"#FFFFFF",
        flexDirection:"row-reverse",
        marginBottom:5
    },
      input: {
        width:"90%",
        alignSelf:"center",
        color:"black",
        borderWidth:1
      },
      modal:{
        flex:1,
        backgroundColor:"white",
        height:430,
        marginTop:150,
        width:330,
        marginLeft:30,
      }
})