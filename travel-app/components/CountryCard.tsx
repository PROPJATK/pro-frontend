import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'

interface CountryCardProps {
  countryName: string
  imageUrl: string
}

const CountryCard: React.FC<CountryCardProps> = ({
  countryName,
  imageUrl,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
      />
      <View style={styles.overlay}>
        <Text style={styles.countryName}>
          {countryName}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#363636',
    width: '90%',
    height: 150,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    position: 'absolute',
  },
  overlay: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryName: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default CountryCard
