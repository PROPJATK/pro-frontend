import React, { useEffect, useState } from 'react'
import { View, Text } from './../components/Themed'
import { StyleSheet } from 'react-native'
import axios from 'axios'
import CountryCard from './../components/CountryCard'
import { work_ip } from './_layout'

type Country = {
  name: string
  image: string
}

const Index = () => {
  const [countries, setCountries] = useState<Country[]>([])

  useEffect(() => {
    axios
      .get(`http://${work_ip}:3000/api/countries`)
      .then((response) => {
        setCountries(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Countries</Text>
      {countries.map((country) => (
        <CountryCard
          key={country.name}
          countryName={country.name}
          imageUrl={country.image}
        />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default Index
