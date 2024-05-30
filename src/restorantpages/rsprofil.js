import { View, Text,Image ,StyleSheet, FlatList, SectionList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { GET_RESTAURANT_BY_EMAIL , GET_URUNLER} from '../components/sorgular';
import { Avatar, Button } from 'react-native-paper';

export default function Rsprofil({navigation}) {

  const { genelResponse } = useSelector(state => state)
  const [getRestorants] = useMutation(GET_RESTAURANT_BY_EMAIL)
  const { loading, error, data } = useQuery(GET_URUNLER);

  const [restoranData, setRestoranData] = useState(null);
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [phone,setPhone] = useState("")
  const [address,setAddress] = useState("")
  const [image,setImage] = useState("")
  const [minTutar,setMinTutar] = useState()
  const [category,setCategory] = useState("")
  const [puan,setPuan] = useState()
  const [acilisSaati,setAcilisSaati] = useState()
  const [kapanisSaati,setKapanisSaati] = useState()
  const [id,setId]=useState()
  const [resturun,setResturun]= useState([])
  
  useEffect(() => {
      if (genelResponse.email) {
          getRestorants({ variables: { email: genelResponse.email } }).then(result => {
              setRestoranData(result.data.getRestoran.restoran);
              setName(result.data.getRestoran.restoran.name)
              setEmail(result.data.getRestoran.restoran.email)
              setPassword(result.data.getRestoran.restoran.sifre)
              setPhone(result.data.getRestoran.restoran.telefon)
              setAddress(result.data.getRestoran.restoran.adres)
              setImage(result.data.getRestoran.restoran.resim)
              setMinTutar(result.data.getRestoran.restoran.minTutar)
              setCategory(result.data.getRestoran.restoran.category)
              setPuan(result.data.getRestoran.restoran.puan)
              setAcilisSaati(result.data.getRestoran.restoran.acilisSaati)
              setKapanisSaati(result.data.getRestoran.restoran.kapanisSaati)
              setId(result.data.getRestoran.restoran.id)
              const arra=[]
              data.urunler.forEach(element => {
                if (element.restoran.id == id) {
                  arra.push(element)
                }
              });
              console.log("arra",arra)
              setResturun(arra)
          }).catch(error => {
              console.log("Error fetching data:", error);
          });
      }
  }, [genelResponse.email])


  const DATA = [
    {
      title: 'Yemekler',
      data:  resturun.filter((item)=>item.category.name=="yemekler").map((item)=>item.name),
    },
    {
      title: 'Tatlılar',
      data: resturun.filter((item)=>item.category.name=="tatlılar").map((item)=>item.name),
    },
    {
      title: 'İçecekler',
      data:  resturun.filter((item)=>item.category.name=="içecekler").map((item)=>item.name),
    },
  ];
  return (
    <View >
      <View style={{backgroundColor:"red"}}>
      <View style={styles.view}>
          <Avatar.Image source={{uri:image}} size={100} style={styles.avatar}></Avatar.Image>
          <View style={{marginLeft:30}}>
          <Text style={styles.text}>{name}</Text>
          <Text style={styles.text}>{phone}</Text>
          <Text style={styles.text}> {acilisSaati}</Text>
          <Text style={styles.text}> {kapanisSaati}</Text>
          <Text style={styles.text}>{email}</Text>
          <Text style={styles.text}>{id}</Text>
          </View>
      </View>
          <Text style={styles.text}>{address}</Text>
      </View>
          <View>
            <Text style={{fontWeight:"bold",fontSize:25}}>Ürünler</Text>
           

    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item}</Text>
        </View>
      )}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
    <Button onPress={()=>{navigation.navigate("Urunler",{resturun:resturun})}}>Urunler</Button>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
  view:{
    backgroundColor:"red",
    flexDirection:"row"
  },
  text:{
    color:"white",
    fontSize:15
  },
  avatar:{
    marginTop:5
  },
  header:{
    fontSize:30,
    fontWeight:"bold"
  },
  item:{

  }
})