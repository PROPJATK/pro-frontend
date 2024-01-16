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
import CountryInfo from '../../../components/CountryInfo'
import { work_ip } from '../../_layout'

type CountryData = {
  name: string
  image: string
  currency: string
  population: number
  language: string
  cities: {
    name: string
    image: string
  }[]
}

const CountryPage = () => {
  const navigation = useNavigation()
  const pathname = usePathname()
  const colorScheme = useColorScheme()
  const textColor =
    colorScheme === 'light' ? 'black' : 'white'
  const countryName = pathname.split('/').pop()
  const [countryData, setCountryData] =
    useState<CountryData | null>(null)

  useEffect(() => {
    navigation.setOptions({ title: countryName })
    const fetchCountryData = async () => {
      const response = await fetch(
        `http://${work_ip}:3000/api/countries/${countryName}`
      )
      const data = await response.json()
      setCountryData(data)
    }
    fetchCountryData()
  }, [])

  if (!countryData) {
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
          source={{ uri: countryData.image }}
          style={styles.image}
        />
      </View>
      <CountryInfo
        currency={countryData.currency}
        population={countryData.population}
        language={countryData.language}
      />
      <View style={styles.citiesContainer}>
        {countryData.cities.map((city, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() =>
              router.push(
                `/country/${countryName}/city/${city.name}`
              )
            }
          >
            <Text style={styles.title}>{city.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#363636',
    padding: 8,
    margin: 8,
    borderRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  citiesContainer: {
    position: 'absolute',
    bottom: 40,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
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

export default CountryPage
