import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {Badge, Modal, Portal} from 'react-native-paper';
import {Icon} from '@rneui/themed';
import ModalCard from './modal';

export default function SiparisCard(props) {
  const [modal, setModal] = useState();
  function hideModal() {
    setModal(false);
  }
  function openmodal() {
    setModal(true);
  }
  console.log(props.siparisurun)
  return (
    <TouchableOpacity onPress={openmodal}>
      <Portal>
        <Modal visible={modal}  onDismiss={hideModal} dismissableBackButton={true}  style={styles.modal}>
           <ModalCard siparisurun={props.siparisurun} isim={props.isim} adres={props.adres}></ModalCard>
        </Modal>
      </Portal>
      <View style={styles.view}>
        <Badge  onPress={() => {
            console.log(props.status);
          }}
          style={styles.badge}>
          <Icon name="cancel" color={'white'}></Icon>
        </Badge>
        <Text>  {props.isim.split(' ')[0] + ' ' + props.isim.split(' ')[1][0]}.  </Text>
        <Text>{props.adres}</Text>
        <Text>{props.siparisdetay.fiyat}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  view: {
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: 'white',
  },
  badge: {
    position: 'relative',
    top: 1,
    left: 1,
    backgroundColor: '#FFB9B9',
  },
  view2: {
    marginBottom: 10,
  },
  modal: {
    flex: 1,
    backgroundColor: 'white',
    height: 450,
    marginTop: 150,
    width: 330,
    marginLeft: 30,
  },
});
