import { View, Text,StyleSheet ,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'

export default function Restorantcard(props) {
    
  return (
   <TouchableOpacity onPress={()=>{props.navigation.navigate("Restorantdetail")}}>
      <Card>
        <View style={style.card}>
            <View style={{marginRight:10}}>
            <Image
               style={{ width: 90, height: 90 }}
               source={{
                   uri: 'https://reactnative.dev/img/tiny_logo.png',
                }}/>
            </View>
            <View>
                <View style={{height:60}}>

                 <Text style={style.text}>{props.resname}</Text>
                </View>
                <View>
                 <Text style={{fontSize:10,color:"black"}}>Minimum sepet tutarı {props.min}</Text>

                </View>
            </View>
        </View>
      </Card>
    </TouchableOpacity>
    
  )
}


const style=StyleSheet.create({
    text:{
        color:"black",
        fontSize:20
    },
    card:{
        flexDirection:"row",
        marginBottom:10,
        backgroundColor:"#F3EDC8",
        height:100
    }
})