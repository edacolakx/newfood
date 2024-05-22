import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Button, Switch } from 'react-native-paper';
import Restorantcard from '../components/restorantcard';
import { GET_RESTAURANT } from '../components/sorgular';
import { useQuery } from '@apollo/client';

export default function Anasayfa({ navigation }) {
  const { loading, error, data } = useQuery(GET_RESTAURANT);
  const [sortedData, setSortedData] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    if (data && data.restoranlar) {
      const sortedRestaurants = [...data.restoranlar].sort((a, b) =>
        isEnabled ? a.minTutar - b.minTutar : b.minTutar - a.minTutar
      );
      setSortedData(sortedRestaurants);
    }
  }, [data, isEnabled]);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const renderItem = ({ item }) => (
    <Restorantcard restoran_name={item.name} min={item.minTutar} resim={item.resim} navigation={navigation} adres={item.adres} />
  );

  return (
    <View>
      <Text style={styles.text}>Kategoriler</Text>
      <Button onPress={()=>{navigation.navigate("Deneme")}}>bas</Button>
      <FlatList
        horizontal
        data={data?.restoranlar.map(item => item.category).filter((value, index, self) => self.indexOf(value) === index)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("KategoriRestorant", { kategori: item, restoranlar: data.restoranlar })}>
            <View>
            <Avatar.Image source={
        item=="Burger"?require("../resimler/hamburger.jpg"):(
          item=="Pizza"?require("../resimler/pizza.png"):(
            item=="Döner"?require("../resimler/doner.jpg"):(
              item=="Tavuk"?require("../resimler/tavuk.jpeg"):(
                item=="Kahvaltı ve Börek"?require("../resimler/kahvalti.jpg"):(
                  item=="Waffle ve Dondurma"?require("../resimler/waffle.jpeg"):(
                    item=="Pide ve Lahmacun"?require("../resimler/pide.jpg"):null
          )
        )))))
        }/>
              <Text style={{ color: "black", textAlign: "center" }}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <Text style={styles.text}>Restorantlar</Text>
      <View style={{ flexDirection: "row-reverse" }}>
        <Text style={{ color: isEnabled ? "#ffb9b9" : "black", fontWeight: "bold" }}>Artan</Text>
        <Switch
          trackColor={{ false: 'red', true: '#ffb9b9' }}
          thumbColor={isEnabled ? '#ffb9b9' : 'red'}
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={{ color: isEnabled ? "black" : "red", fontWeight: "bold" }}>Azalan</Text>
      </View>
      <FlatList data={sortedData} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 3
  }
});
