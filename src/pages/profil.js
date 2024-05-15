import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'

export default function Profil() {
  return (
    <View style={styles.view}>
      <Card style={styles.card}>
        <Text style={styles.texttop}>İsim Syoisim</Text>
        <Text style={styles.text}>İsim Soysiim</Text>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.texttop}>Email</Text>
        <Text style={styles.text}>Email</Text>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.texttop}>DG</Text>
        <Text style={styles.text}>DG</Text>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.texttop}>Telefon</Text>
        <Text style={styles.text}>Telefon</Text>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  card:{
    height:"20%",
    width:"90%",
    marginBottom:20,
    backgroundColor:"#FFB9B9",
  },
  view:{
    flex:1,
    justifyContent:"space-evenly",
    alignItems:"center"
  },
  texttop:{
    color: "black",
    fontWeight:"bold",
    fontSize:20
  },
  text:{
    color:"black",
    marginLeft:20
  }
})