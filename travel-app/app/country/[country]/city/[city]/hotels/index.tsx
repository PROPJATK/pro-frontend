import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { router, usePathname } from 'expo-router'

import { work_ip } from '../../../../../_layout'

import Card from "../../../../../../components/Card"



type HotelData = {
  id: string
  _id: string
  name: string
  link: string
  address: string
  stars: number
}

const HotelsPage = () => {
  const [hotelsData, setHotelsData] = useState<
    HotelData[] | null
  >(null)
  const pathname = usePathname()
  const countryName = pathname.split('/')[2]
  const cityName = pathname.split('/')[4]

  useEffect(() => {
    const fetchHotelsData = async () => {
      const response = await fetch(
        `http://${work_ip}:3000/api/countries/${countryName}/cities/${cityName}/hotels`
      )
      const data = await response.json()
      setHotelsData(data)
    }
    fetchHotelsData()
  }, [])

  if (!hotelsData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    )
  }

  return (
  <View style={styles.container}>
    {hotelsData.map((hotel: HotelData) => (
      <View key={hotel.name}>
        <Card name={hotel.name} location={hotel.address} rating={hotel.stars} />
      </View>
    ))}
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  }
})

export default HotelsPage
