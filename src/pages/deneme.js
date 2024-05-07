import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { FlatList } from 'react-native-gesture-handler';

const ADD_CUSTOMER = gql`
  query{
    musteriler{
      id
      ad
      soyad
      email
      adres
      telefon
    }
  }
`;

const Deneme = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [adres, setAdres] = useState('');
  const [telefon, setTelefon] = useState('');

  const [loading,error,data] = useQuery(ADD_CUSTOMER);

  const handleAddCustomer = () => {
    addCustomer({
      variables: {
        name,
        surname,
        email,
        adres,
        telefon
      }
    })
    .then(result => {
      console.log('Customer added successfully:', result.data.musteriEkle.musteri);
    })
    .catch(error => {
      console.error('Error adding customer:', error);
    });
  };

  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={({item})=>(
        <View>
          <Text>{item.ad} {item.soyad}</Text>
          <Text>{item.email}</Text>
          <Text>{item.adres}</Text>
          <Text>{item.telefon}</Text>
        </View>
      
      )}></FlatList>
      <Button title="Add Customer" onPress={handleAddCustomer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10
  }
});

export default Deneme;
