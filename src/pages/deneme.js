import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_URUNLER } from '../components/sorgular';
import { Button, Modal } from 'react-native-paper';

export default function Deneme() {
  const { error, loading, data } = useQuery(GET_URUNLER);
  const [ka, setKa] = useState([]);

  useEffect(() => {
    if (data && data.urunler) {
      try {
        console.log(data.urunler);
        const filteredData = data.urunler.filter(urun => urun.restoran.id == 1);
        console.log(filteredData);
        const kategorilereGoreUrunler = data.urunler.reduce((acc, curr) => {
          if (!acc[curr.category.name]) {
            acc[curr.category.name] = [];
          }
          acc[curr.category.name].push(curr);
          return acc;
        }, {});
        setKa(kategorilereGoreUrunler);
        console.log("ka", kategorilereGoreUrunler);
      } catch (error) {
        console.log("error", error);
      }
    }
  }, [data]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  const[model,setModel]=useState(false)
  return (
    <View>
      <Button onPress={()=>setModel(true)}>bas</Button>
      <Modal visible={model}>
        <Text>Deneme</Text>
      </Modal>
    </View>
  );
}
