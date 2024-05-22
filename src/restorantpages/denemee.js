import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { GET_RESTAURANT_BY_EMAIL } from '../components/sorgular'
import { useSelector } from 'react-redux'

export default function Denemee() {
    const { genelResponse } = useSelector(state => state)
    const [getRestorants, { data }] = useMutation(GET_RESTAURANT_BY_EMAIL)
    const [restoranData, setRestoranData] = useState(null);
    console.log(genelResponse.email)
    useEffect(() => {
        if (genelResponse.email) {
            getRestorants({ variables: { email: genelResponse.email } }).then(result => {
                setRestoranData(result.data.getRestoran.restoran);
            }).catch(error => {
                console.log("Error fetching data:", error);
            });
        }
    }, [genelResponse.email])

    console.log("restorant", restoranData.name)

    return (
        <View>
            <Text>Denemee</Text>
        </View>
    )
}