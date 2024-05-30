import React, { useEffect, useState } from 'react';
import { View, StyleSheet ,Text, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Itemcard from '../components/itemcard';
import { Avatar, Button } from 'react-native-paper';
import { Icon } from '@rneui/themed';
import { setMiktarRedux, setSepetMiktar, setUrun } from '../redux/actions';

const Sepet = ({navigation}) => {
    const {genelResponse}=useSelector(state=>state)
    const dispatch= useDispatch()
   

    function handleAmount(id) {
      if (genelResponse.miktar==0) {
        const newArray = array.filter(item => item.id !== id);
        dispatch(setUrun(newArray))
      }
    }
    
    const renderItem = ({ item }) => (
      <View>
        <View style={styles.card}> 
            <View>
              <View style={{flexDirection:"row"}}>

            <Avatar.Image size={70} style={{marginTop:10}} source={{uri:item.resim}} />
            <View>

            <Text style={{color:"black",marginTop:10,fontWeight:"bold",fontSize:20}}>{item.isim}</Text>
            <Text style={{color:"black"}}>{item.fiyat}</Text>
            <Text style={{color:"black"}}>{item.not}</Text>
            </View>
              </View>
            </View>
            <View style={{alignItems:"center",height:50,alignSelf:"center",flexDirection:"row"}}>
            <TouchableOpacity onPress={()=>{
              
              dispatch(setMiktarRedux(genelResponse.miktar-1))
              
              }} style={{marginTop:5}}>
            <Text style={styles.text}>-</Text>
          </TouchableOpacity>
              <Text style={{color:"black",fontSize:25,marginRight:20,marginTop:5}}>{item.miktar}</Text>
          <TouchableOpacity onPress={()=>{dispatch(setMiktarRedux(genelResponse.miktar+1))}} style={{marginTop:5}}>
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
            </View>
        </View>
      </View>
  );

const totalPrice = genelResponse.urun.reduce((accumulator, current) => {
  return accumulator + current.fiyat*genelResponse.miktar;
}, 0)

useEffect(()=>{
  const sayi=genelResponse.urun.length
  dispatch(setSepetMiktar(sayi))
  console.log("sa",sayi)

},[genelResponse.urun])
console.log("totalprice",totalPrice)
 
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList data={genelResponse.urun} style={{width:"100%"}} renderItem={renderItem}></FlatList>
      </View>
      <View style={styles.bottom}>
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>

        <Text style={{fontSize:25,color:"black"}}>Toplam Fiyat</Text>
        <Text style={{fontSize:25,marginRight:5}}>{totalPrice} TL</Text>
        </View>
        <Button style={styles.button} labelStyle={{color:"white"}} onPress={()=>{navigation.navigate("Odeme")}} >Sipariş Ver</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    height: "10%",
    backgroundColor: 'white',
    justifyContent:"space-around"
  },
  card:{
    backgroundColor:"white",
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom:5,
    marginTop:5
  },
  text:{
    color:"black",
    fontSize:25,
    marginRight:30
  },
  button:{
    backgroundColor:"red",
    width:"70%",
    alignSelf:"center"
  }
});

export default Sepet;
