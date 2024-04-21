import { View, Text, useWindowDimensions, FlatList ,Image} from 'react-native'
import React from 'react'
import { Avatar, Card } from 'react-native-paper'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import Product from '../components/product'

const dataa = [
    {
      id: '10',
      title: 'First Item',
    },
    {
      id: '20',
      title: 'Second Item',
    },
    {
      id: '30',
      title: 'Third Item',
    },
  ]
const FirstRoute = () => (
    <View style={{ flex: 1}} >
        <FlatList data={dataa} renderItem={({item})=>(<Product isim={item.title}></Product>)}></FlatList>
    </View>
  );
  
  const SecondRoute = () => (
    <View style={{ flex: 1 }} >
        <Text>Second</Text>
    </View>
  );
  
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  })
export default function Restorantdetail() {


    const [routes] = React.useState([
        { key: 'first', title: 'Tüm Ürünler' },
        { key: 'second', title: 'İçecekler' },
      ]);
      const [index, setIndex] = React.useState(0);
      const layout = useWindowDimensions();

  return (
    <View style={{flex:1}}>
      <View>
        <Card style={{height:200,backgroundColor:"#E6BAA3"}}>
            <View style={{backgroundColor:"#E6BAA3"}}>
                <View style={{flexDirection:"row"}}>
                    <View>
                          <Avatar.Image size={140} source={{
                            uri:"https://reactnative.dev/img/tiny_logo.png",
                             }} />
                    </View>
                    <View>
                        <Text style={{color:"black",fontSize:40}}>restorant ismi</Text>
                        <Text>min sepet</Text>
                    </View>
                </View>
                <View>
                    <Text>adres</Text>
                </View>
            </View>
        </Card>
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
        style={{backgroundColor:"#E6BAA3"}}
        ></TabBar>
      )}
    />
      </View>
    </View>
  )
}