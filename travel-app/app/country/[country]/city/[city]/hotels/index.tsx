import { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { router, usePathname } from 'expo-router'

import { work_ip } from '../../../../../_layout'


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
        <View key={hotel._id} style={styles.card}>
          <Text style={styles.title}>{hotel.name}</Text>
          <Text style={styles.address}>
            {hotel.address}
          </Text>
          <Text style={styles.address}>
            {hotel.stars} stars
          </Text>
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
  card: {
    backgroundColor: '#363636',
    padding: 8,
    margin: 8,
    borderRadius: 4,
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  address: {
    color: '#fff',
    fontSize: 14,
  },
})

export default HotelsPage
