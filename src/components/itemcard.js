import { View, Text , StyleSheet,TextInput,FlatList, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { Avatar, Badge, Button, Card, FAB, Modal, PaperProvider, Portal,  } from 'react-native-paper'
import ModalComponent from './modal';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from '../redux/actions';
import { Icon } from '@rneui/themed';

export default function Itemcard(props) {
   
const {genelResponse}=useSelector(state=>state)
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
 const dispatch=useDispatch()
    function showModal(){
      setVisible(true)
        dispatch(setModal(true))
        array.push(veri)
        console.log(array)
    }

    const hideModal = () => setVisible(false);
  return (
    <View>
        <View style={styles.card}>
             <Avatar.Image size={70} style={{marginTop:10,marginRight:20}} source={{uri:props.resim}} />
               
              <View style={{flex:1}}>
                  <Text style={{color:"black",fontWeight:"bold",fontSize:20,marginLeft:10}}>{props.isim}</Text>
                  <Text style={{color:"black",marginLeft:10,marginBottom:10,fontStyle:"italic"}}>{props.description}</Text>
                  <Text style={{color:"black",marginLeft:10,fontSize:15}}>{props.fiyat} TL</Text>
              </View>
              
              <Badge style={{ position: "absolute", top: 1, left: 1, backgroundColor: "#E72929" }} size={40}>
               <TouchableOpacity onPress={showModal}  style={{justifyContent:"center"}}>
                <Icon onPress={showModal} name='add-circle-outline' size={30} color={"white"}></Icon>
               </TouchableOpacity>
              </Badge>
 
        </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} dismissableBackButton={true} style={styles.modal}>
            <ModalComponent isim={props.isim} description={props.description} resim={props.resim} fiyat={props.fiyat} id={props.id} closeModal={hideModal}></ModalComponent>
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
        height:450,
        marginTop:150,
        width:330,
        marginLeft:30,
      }
})