import { View, Text, useWindowDimensions, FlatList ,Image,StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card } from 'react-native-paper'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import Itemcard from '../components/itemcard'
import { useQuery } from '@apollo/client'
import { GET_URUNLER } from '../components/sorgular'

export default function Restorantdetail({route,navigation}) {
  const {error,loading,data} = useQuery(GET_URUNLER)
  const [urunler,setUrunler]=useState([])
  const [tatliKategorisi,setTatlikategorisi] = useState([])
  const [yemekKategorisi,setYemekkategorisi] = useState([])
  const [icecekKategorisi,setIcecekkategorisi] = useState([])

  useEffect(() => {
    if (data && data.urunler) {
      try {
        console.log(data.urunler);
        const filteredData = data.urunler.filter(urun => urun.restoran.id == 8);
        setUrunler(filteredData);

        const kategorilereGoreUrunler = filteredData.reduce((acc, curr) => {
          if (!acc[curr.category.name]) {
            acc[curr.category.name] = [];
          }
          acc[curr.category.name].push(curr);
          return acc;
        }, {});

        if (kategorilereGoreUrunler["tatlılar"]) {
          setTatlikategorisi(kategorilereGoreUrunler["tatlılar"]);
        }
        if (kategorilereGoreUrunler["yemekler"]) {
          setYemekkategorisi(kategorilereGoreUrunler["yemekler"]);
        }
        if (kategorilereGoreUrunler["içecekler"]) {
          setIcecekkategorisi(kategorilereGoreUrunler["içecekler"]);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  }, [data]);

  const renderItem = ({ item }) => (
    <Itemcard isim={item.name} description={item.detay} fiyat={item.fiyat} resim={item.image} id={item.id}></Itemcard> 
  );

  const FirstRoute = () => (
    <View style={{ flex: 1}}>
      <FlatList data={urunler} renderItem={renderItem}></FlatList>
    </View>
  );
  
  const SecondRoute = () => (
    <View style={{ flex: 1 }}>
      <FlatList data={tatliKategorisi} renderItem={renderItem}></FlatList>
    </View>
  );

  const ThirdRoute = () => (
    <View style={{ flex: 1 }}>
      <FlatList data={yemekKategorisi} renderItem={renderItem}></FlatList>
    </View>
  );

  const FourthRoute = () => (
    <View style={{ flex: 1 }}>
      <FlatList data={icecekKategorisi} renderItem={renderItem}></FlatList>
    </View>
  );
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute
  });

  const [routes] = React.useState([
    { key: 'first', title: 'Tüm Ürünler' },
    { key: 'second', title: 'Yemekler' },
    { key: 'third', title: 'Tatlılar' },
    { key: 'fourth', title: 'İçecekler' },
  ]);
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();
  const {resim,min,isim,adres}=route.params

  return (
    <View style={{flex:1}}>
      <View style={styles.content}>
        <View style={{backgroundColor:"#E72929"}}>
          <View style={{flexDirection:"row"}}>
            <View>
              <Avatar.Image size={140} source={{ uri:resim }} />
            </View>
            <View style={{marginLeft:20}}>
              <Text style={{color:"white",fontSize:35,marginBottom:20}}>{isim}</Text>
              <Text style={{color:"white"}}>Minimum Sepet Tutarı {min}</Text>
              <Text style={{color:"white"}}>{adres}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{flex:1}}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          swipeEnabled={true}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={{backgroundColor:"#E72929"}}
              labelStyle={{fontSize:10}}
            />
          )}
        />
      </View>
      <View style={styles.bottom}>
        <Button onPress={() => {navigation.navigate("Sepet")}} labelStyle={{color:"white"}}>Sepete Git</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
  },
  bottom: {
    height: 50,
    backgroundColor: 'red',
  },
});
