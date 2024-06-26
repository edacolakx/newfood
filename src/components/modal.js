import { View, Text ,StyleSheet,TextInput, Image, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { Avatar,  FAB,Button} from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux';
import {setMiktarRedux, setModal, setUrun} from '../redux/actions'

export default function ModalComponent(props) {
    const [text, setText] = useState('');
    const [miktar, setmiktar] = useState(1);
    const dispatch=useDispatch()
    const {genelResponse}=useSelector(state=>state)
    const urunler=genelResponse.urun

   const urun={
      id:props.id,
      isim:props.isim,
      description:props.description,
      not:text,
      resim:props.resim,
      miktar:miktar,
      fiyat:props.fiyat
    }


    function sepetteUrunVarMi(sepet, urunId) {
      const urun = sepet.find(item => item.id === urunId);
      return urun ? true : false;
    }
    console.log(miktar)
    const urunSepetteVarMi = sepetteUrunVarMi(genelResponse.urun, props.id);
    function onText(tex){setText(tex)} 

    const sepeteEkle = () => {
      // Ürünün sepette olup olmadığını kontrol et
      const index = genelResponse.urun.findIndex(item => item.id === urun.id);
      console.log(index)
      if (index >0) {
        // Ürün zaten sepette varsa, miktarını artır
        const yeniSepet = [...genelResponse.urun];
        yeniSepet[index].miktar=yeniSepet[index].miktar+1;
        dispatch(setUrun(yeniSepet))
      } else {
        // Ürün sepette yoksa, yeni bir öğe olarak ekle
       dispatch( setUrun([...genelResponse.urun, { ...urun, miktar: miktar }]));
      }
    };
    
  return (
    <View style={{height:"100%"}}>
        <Image
        style={{alignSelf:"center",height:150,width:150,marginTop:5}}
        source={{
            uri: props.resim,
          }}
      />
    
    <Text style={{color:"black",fontWeight:"bold",fontSize:25,alignSelf:"center"}}>{props.isim}</Text>
    <Text style={{color:"black",fontSize:20,marginLeft:10}}>{props.description}</Text>
    <Text style={{color:"black",fontSize:20,marginRight:10,marginBottom:50,textAlign:"right"}}>{props.fiyat} TL</Text>
      <TextInput style={styles.input} 
        placeholderTextColor={"black"} onChangeText={onText}
        numberOfLines={4} multiline={true} placeholder='Notunuzu Yaziniz'></TextInput>


         <View style={{flexDirection:"row",width:"90%",alignSelf:"center",justifyContent:"space-evenly"}}>
          <TouchableOpacity onPress={()=>{setmiktar(miktar-1)}} style={{marginTop:5}}>
            <Text style={styles.text}>-</Text>
          </TouchableOpacity>
          <Text style={{color:"black",fontSize:20,marginTop:5}}>{miktar}</Text>
          <TouchableOpacity onPress={()=>{setmiktar(miktar+1)}} style={{marginTop:5}}>
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
          <Button mode='elevated' onPress={sepeteEkle} style={{backgroundColor:"red"}} labelStyle={{color:"white"}}>Sepete Ekle</Button>
        </View>
    </View>
  )
}

const styles=StyleSheet.create({
    input: {
        width:"90%",
        alignSelf:"center",
        color:"black",
        borderWidth:1,
        marginBottom:10
      },
      text:{
        color:"white",
        backgroundColor:"red",
        width:30,
        borderRadius:8,
        fontSize:20,
        textAlign:"center"
      }
})