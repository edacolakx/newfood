import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { CHECK_USER, GET_RESTAURANT_BY_EMAIL } from '../components/sorgular'
import { useSelector } from 'react-redux'

export default function Yenideneme() {

    const [checkuser] = useMutation(CHECK_USER)
    const [getres] = useMutation(GET_RESTAURANT_BY_EMAIL)
    const {genelResponse} = useSelector(state=>state)
    console.log(genelResponse.email)
    useEffect(()=>{
        if (genelResponse.email) {
            checkuser({variables:{email:genelResponse.email}}).then(result=>{
                console.log("result",result)
            }).catch(error => {
                console.log("Error fetching data:", error);
            });
        }
    },[genelResponse.email])

  return (
    <View>
      <Text>Yenideneme</Text>
    </View>
  )
}