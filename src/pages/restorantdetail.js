import { View, Text, useWindowDimensions, FlatList ,Image} from 'react-native'
import React from 'react'
import { Avatar, Card } from 'react-native-paper'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import Itemcard from '../components/itemcard'

const urun = [
    {
      id: '10',
      title: 'Hamburger',
      description:"köfte",
      fiyat:20,
      kategori:"yemek",
      resim:"https://www.burgerking.com.tr/cmsfiles/products/hamburger.png?v=413"
    },
    {
      id: '20',
      title: 'Pizza',
      description:"sucuk",
      fiyat:10,
      kategori:"yemek",
      resim:"https://yemek.com/_next/image/?url=https%3A%2F%2Fcdn.yemek.com%2Fmnresize%2F1250%2F833%2Fuploads%2F2022%2F03%2Fev-usulu-pizza-yemekcom.jpg&w=1920&q=75",
    },
    {
      id: '30',
      title: 'Çay',
      description:"earl",
      fiyat:30,
      kategori:"icecek",
      resim:"https://dogukaradenizcay.com/cay_hikaye_2.jpg"
    },
    {
      id: '40',
      title: 'Kola',
      description:"Coca Cola",
      fiyat:30,
      kategori:"icecek",
      resim:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEqA87jZjZV3WKceUWE2ferxMsVxg7B9CfkkCsNpo49g&s"
    },
    {
      id: '50',
      title: 'Trileçe',
      description:"tatlı",
      fiyat:30,
      kategori:"tatli",
      resim:"https://cdn.shopify.com/s/files/1/1259/6441/files/trilece-tatlisi-tarifi.jpg?v=1598011389"
    },
  ]
  const sortedData = [...urun].sort((a, b) => a.fiyat - b.fiyat);
  const kategorilereGoreUrunler = sortedData.reduce((acc, curr) => {
    if (!acc[curr.kategori]) {
      acc[curr.kategori] = [];
    }
    acc[curr.kategori].push(curr);
    return acc;
  }, {});
  const renderItem = ({ item }) => (
    <Itemcard isim={item.title} description={item.description} fiyat={item.fiyat} resim={item.resim}></Itemcard> 
  );
const FirstRoute = () => (
    <View style={{ flex: 1}} >
        <FlatList data={sortedData} renderItem={renderItem}></FlatList>
    </View>
  );
  
  const SecondRoute = () => (
    <View style={{ flex: 1 }} >
        <FlatList data={kategorilereGoreUrunler.yemek} renderItem={renderItem}></FlatList>
    </View>
  );
  const ThirdRoute = () => (
    <View style={{ flex: 1 }} >
        <FlatList data={kategorilereGoreUrunler.icecek} renderItem={renderItem}></FlatList>
    </View>
  );
  const FourthRoute = () => (
    <View style={{ flex: 1 }} >
        <FlatList data={kategorilereGoreUrunler.tatli} renderItem={renderItem}></FlatList>
    </View>
  );
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute
  })


export default function Restorantdetail({route}) {


    const [routes] = React.useState([
        { key: 'first', title: 'Tüm Ürünler' },
        { key: 'second', title: 'Yemekler' },
        { key: 'third', title: 'İçecekler' },
        { key: 'fourth', title: 'Tatlılar' },
      ]);
      const [index, setIndex] = React.useState(0);
      const layout = useWindowDimensions();
      const {resim,min,isim}=route.params
  return (
    <View style={{flex:1}}>
      <View>
            <View style={{backgroundColor:"#E72929"}}>
                <View style={{flexDirection:"row"}}>
                    <View>
                          <Avatar.Image size={140} source={{
                            uri:resim,
                             }} />
                    </View>
                    <View style={{marginLeft:20}}>
                        <Text style={{color:"black",fontSize:40}}>{isim}</Text>
                        <Text>Minimum Sepet Tutarı {min}</Text>
                    </View>
                </View>
                <View>
                    <Text>adres</Text>
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
      renderTabBar={props=>(
        <TabBar
        {...props}
        style={{backgroundColor:"#E72929"}}
        labelStyle={{fontSize:10}}
        ></TabBar>
      )}
    />
      </View>
    </View>
  )
}