import React from 'react';
import {FlatList, Text, View, StyleSheet} from 'react-native';
import {gql, useQuery} from '@apollo/client';

const GET_RESTAURANTS = gql`
query MyQuery {
  kullanicilar {
    email
    hesapTipi
    id
    isim
    sifre
    sifreDogrulama
    soyisim
  }
}
`;

const Deneme = () => {
  const { loading, error, data } = useQuery(GET_RESTAURANTS);
console.log(data)
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={{borderWidth:8}}>
      <View style={{borderWidth:8}}>
        {data.kullanicilar.map(restoran => (
          <View key={restoran.id}>
            <Text>{restoran.name}</Text>
            <Text>{restoran.id}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Deneme;
