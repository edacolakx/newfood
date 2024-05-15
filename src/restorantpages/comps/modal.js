import { View, Text, FlatList ,StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-native-paper';
import MapView from 'react-native-maps';

export default function ModalCard(props) {

  return (
    <View>
       <Text style={{color:"black"}}>{props.isim.split(' ')[0] + ' ' + props.isim.split(' ')[1][0]}</Text>
       <Text style={{color:"black"}}>{props.adres}</Text>
          <FlatList
            style={styles.flatlist}
            data={props.siparisurun}
            renderItem={({item}) => (
              <View style={styles.view2}>
                <View style={{flexDirection: 'row'}}>
                  <View>
                    <Text style={{fontWeight: 'bold', fontSize: 20,color:"black"}}>
                      {item.isim}
                    </Text>
                    <Text style={{color:"black"}}>{item.not == '' ? 'Not yok' : item.not}</Text>
                  </View>
                  <View style={{alignItems: 'flex-end', flex: 1}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginRight: 5,
                        color:"black"
                      }}>
                      Adet: {item.adet}
                    </Text>
                  </View>
                </View>
              </View>
            )}></FlatList>

            <View style={{flexDirection:"row",justifyContent:"center"}}> 
                <Button style={{  width:"45%", backgroundColor:"green"}}>Onayla</Button>
                <Button style={{  width:"45%", backgroundColor:"red"}}>İptal Et</Button>
            </View>
    </View>
  )
}
const styles = StyleSheet.create({
    view2: {
      marginBottom: 10,
    },
    flatlist:{
        width:"90%",
        alignSelf:"center"
    }
  });
  