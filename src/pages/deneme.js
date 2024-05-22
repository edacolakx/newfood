import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const GET_URUNLER = gql`
  query MyQuery {
    urunler {
      detay
      id
      fiyat
      image
      name
      restoran {
        id
      }
    }
  }
`;

const Deneme = () => {
  const { loading, error, data } = useQuery(GET_URUNLER);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const [resturun,setResturun]= useState([])
  useEffect(() => {
    const arra=[]
    if (data && data.urunler) {
      data.urunler.forEach(element => {
        if (element.restoran.id==1) {
          arra.push(element)
        }
      });
      console.log("arra",arra)
      setResturun(arra)
    }
  }, [data]);

  return (
    <View>
      <FlatList
        data={resturun}
        renderItem={({ item }) => (
          <View>
            <Text style={{ color: "black" }}>{item.name}</Text>
          </View>
        )}// Her öğe için benzersiz bir anahtar belirlemek için kullanılır
      />
    </View>
  );
};

export default Deneme;
