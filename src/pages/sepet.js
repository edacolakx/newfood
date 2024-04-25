import React from 'react';
import { View, StyleSheet ,Text} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import Itemcard from '../components/itemcard';

const Sepet = () => {
    const {genelResponse}=useSelector(state=>state)
    const renderItem = ({ item }) => (
      <View>
        <Text style={{color:"black"}}>{item.isim}</Text>
        <Text style={{color:"black"}}>{item.description}</Text>
        <Text style={{color:"black"}}>{item.fiyat}</Text>
      </View>
  );
  console.log(genelResponse.urun)
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FlatList data={genelResponse.urun} style={{width:"100%"}} renderItem={renderItem}></FlatList>
      </View>


      
      <View style={styles.bottom}>
        <Text>Fiyat</Text>
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
  },
});

export default Sepet;
