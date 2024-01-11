import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

type CardProps = {
    name: string,
    location: string
    rating?: number
    cuisine?: string
    children?: React.ReactNode;
}

const Card:React.FC<CardProps> = ({
    name,
    location,
    rating,
    cuisine,
}) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.location}>{location}</Text>
            {rating && <Text style={styles.rating}>{rating} stars</Text>}   
            {cuisine && <Text style={styles.cuisine}>{cuisine}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#363636',
      borderRadius: 8,
      marginTop: 16,
      minWidth: '90%',
      padding: 8,
    },
    title: {
      color: '#fff',
      fontSize: 18,
      marginBottom: 8,
    },
    location: {
      color: '#fff',
      fontSize: 14,
    },
    rating: {
      color: '#fff',
      fontSize: 14,
    },
    cuisine: {
      color: '#fff',
      fontSize: 14,
    }
  });

export default Card;
