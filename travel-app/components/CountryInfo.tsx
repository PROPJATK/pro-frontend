import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface CountryInfoProps {
  currency: string
  population: number
  language: string
}

const CountryInfo: React.FC<CountryInfoProps> = ({
  currency,
  population,
  language,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.title}>Currency</Text>
        <Text style={styles.text}>{currency}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.title}>Population</Text>
        <Text style={styles.text}>{population}</Text>
      </View>
      <View style={styles.field}>
        <Text style={styles.title}>Language</Text>
        <Text style={styles.text}>{language}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '90%',
    gap: 10,
  },
  field: {
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: 4,
    backgroundColor: '#363636',
    padding: 8,
    borderRadius: 4,
  },
  title: {
    color: '#888888',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 6,
  },
})

export default CountryInfo
