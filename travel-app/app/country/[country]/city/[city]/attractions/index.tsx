import { useEffect, useState } from 'react'

import Card from '../../../../../../components/Card'

import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
} from 'react-native'
import { usePathname } from 'expo-router'

import { work_ip } from '../../../../../_layout'

type AttractionData = {
  id: string
  _id: string
  name: string
  link: string
  address: string
}

const AttractionsPage = () => {
  const [attractionsData, setAttractionsData] = useState<
    AttractionData[] | null
  >(null)
  const pathname = usePathname()
  const colorScheme = useColorScheme()
  const textColor =
    colorScheme === 'light' ? 'black' : 'white'
  const countryName = pathname.split('/')[2]
  const cityName = pathname.split('/')[4]

  useEffect(() => {
    const fetchAttractionsData = async () => {
      const response = await fetch(
        `http://${work_ip}:3000/api/countries/${countryName}/cities/${cityName}/attractions`
      )
      const data = await response.json()
      setAttractionsData(data)
    }
    fetchAttractionsData()
  }, [])

  if (!attractionsData) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { color: textColor }]}>
          Loading...
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {attractionsData.map((attraction: AttractionData) => (
        <Card
          key={attraction.name}
          name={attraction.name}
          location={attraction.address}
        ></Card>
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
  },
})

export default AttractionsPage
