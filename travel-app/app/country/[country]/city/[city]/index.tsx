import { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native'
import { Image } from 'react-native'
import {
  router,
  useNavigation,
  usePathname,
} from 'expo-router'
import { work_ip } from '../../../../_layout'

type CityData = {
  name: string
  image: string
  description: string
}

const CityPage = () => {
  const [cityData, setCityData] = useState<CityData | null>(
    null
  )
  const navigation = useNavigation()
  const pathname = usePathname()
  const colorScheme = useColorScheme()
  const textColor =
    colorScheme === 'light' ? 'black' : 'white'
  const countryName = pathname.split('/')[2]
  const cityName = pathname.split('/').pop()

  useEffect(() => {
    navigation.setOptions({ title: cityName })
    const fetchCityData = async () => {
      const response = await fetch(
        `http://${work_ip}:3000/api/countries/${countryName}/cities/${cityName}`
      )
      const data = await response.json()
      setCityData(data)
    }
    fetchCityData()
  }, [])

  if (!cityData) {
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
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: cityData.image }}
          style={styles.image}
        />
      </View>
      <Text style={[styles.title, { color: textColor }]}>
        {cityData.description}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push(
            `/country/${countryName}/city/${cityName}/attractions`
          )
        }
      >
        <Text style={styles.title}>Attractions</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push(
            `/country/${countryName}/city/${cityName}/hotels`
          )
        }
      >
        <Text style={styles.title}>Hotels</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push(
            `/country/${countryName}/city/${cityName}/restaurants`
          )
        }
      >
        <Text style={styles.title}>Restaurants</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: 30,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#363636',
    padding: 10,
    borderRadius: 4,
    maxHeight: 70,
    flex: 1,
    width: '90%',
    gap: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 15,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
  },
  imageContainer: {
    backgroundColor: '#363636',
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
})

export default CityPage
