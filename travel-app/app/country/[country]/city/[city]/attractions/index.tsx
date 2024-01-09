import { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import {
  router,
  useNavigation,
  usePathname,
} from 'expo-router'
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
        <Text style={styles.title}>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {attractionsData.map((attraction: AttractionData) => (
        <View key={attraction._id} style={styles.card}>
          <Text style={styles.title}>
            {attraction.name}
          </Text>
          <Text style={styles.address}>
            {attraction.address}
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

export default AttractionsPage
