import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import SearchBar from '@/components/SearchBar';
import fetchDrivers from '@/services/api';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/banner.png')}
          style={styles.banner}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Pesquise por um piloto!!</ThemedText>
        <HelloWave />
      </ThemedView>
      <SearchBar onSearch={fetchDrivers} />
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  banner: {
    height: 300,
    width: 490,
    bottom: 0,
    left: 0,
    position: 'absolute',
    
  },
});
