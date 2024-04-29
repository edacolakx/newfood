import React from 'react';
import { View, StyleSheet ,Text, TouchableOpacity} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Itemcard from '../components/itemcard';
import { Avatar, Button } from 'react-native-paper';
import { Icon } from '@rneui/themed';

const Sepet = () => {
    const {genelResponse}=useSelector(state=>state)
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
            <TouchableOpacity onPress={()=>{console.log("object")}} style={{marginTop:5}}>
            <Text style={styles.text}>-</Text>
          </TouchableOpacity>
              <Text style={{color:"black",fontSize:25,marginRight:20,marginTop:5}}>{item.miktar}</Text>
          <TouchableOpacity onPress={()=>{console.log("object")}} style={{marginTop:5}}>
            <Text style={styles.text}>+</Text>
          </TouchableOpacity>
            </View>
        </View>
      </View>
  );

const totalPrice = genelResponse.urun.reduce((accumulator, current) => {
  return accumulator + current.fiyat;
}, 0)

console.log("totalprice",totalPrice)
 
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList data={genelResponse.urun} style={{width:"100%"}} renderItem={renderItem}></FlatList>
      </View>


      
      <View style={styles.bottom}>
        <Text>Fiyat</Text>
        <Text>{totalPrice}</Text>
        <Button>Ödemeye Geç</Button>
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
    height: 50,
    backgroundColor: 'red',
    flexDirection:"row"
  },
  card:{
    backgroundColor:"white",
    flexDirection:"row",
    justifyContent:"space-between"
  },
  text:{
    color:"black",
    fontSize:25,
    marginRight:30
  }
});

export default Sepet;
