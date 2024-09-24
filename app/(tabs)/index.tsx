import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'; // Verifique se StyleSheet está aqui
import Icon from 'react-native-vector-icons/FontAwesome';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SearchBar from '@/components/SearchBar';
import fetchDrivers from '@/services/api';
import Driver from '@/models/driver';
import { getFavorites, addFavorite, removeFavorite, isFavorite } from '../../services/favorite';

export default function HomeScreen() {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [isFav, setIsFav] = useState(false);

  const handleSearch = async (query: string) => {
    const result = await fetchDrivers(query);
    if (result) {
      setDriver(result[0]);
      const favStatus = await isFavorite(result[0]);
      setIsFav(favStatus);
    }
  };

  const handleFavorite = async () => {
    if (driver) {
      if (isFav) {
        await removeFavorite(driver);
      } else {
        await addFavorite(driver);
      }
      const favStatus = await isFavorite(driver);
      setIsFav(favStatus); // Atualiza o estado após a ação
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/banner.png')}
          style={styles.banner}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Pesquise por um piloto!!</ThemedText>
        <HelloWave />
      </ThemedView>
      <SearchBar onSearch={handleSearch} />

      {driver && (
        <View style={styles.card}>
          <Image source={{ uri: driver.img }} style={styles.driverImage} />
          <ThemedText type="subtitle" style={styles.textBlack}>{driver.nome}</ThemedText>
          <ThemedText style={styles.textBlack}>Pódios: {driver.podiums}</ThemedText>
          <ThemedText style={styles.textBlack}>Campeonatos Mundiais: {driver.world_championships}</ThemedText>
          <ThemedText style={styles.textBlack}>Nacionalidade: {driver.nationality}</ThemedText>
          
          {/* Ícone de favorito */}
          <TouchableOpacity onPress={handleFavorite} style={styles.favoriteIcon}>
            <Icon name="star" size={24} color={isFav ? "#FFD700" : "#C0C0C0"} />
          </TouchableOpacity>
        </View>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  banner: {
    height: 300,
    width: 490,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  driverImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  favoriteIcon: {
    marginTop: 10,
  },
  textBlack: {
    color: 'black', // Define a cor do texto como preta
  },
});
