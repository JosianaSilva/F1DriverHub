import Ionicons from '@expo/vector-icons/Ionicons';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getFavorites } from '@/services/favorite';
import Driver from '@/models/driver';

export default function TabTwoScreen() {
  const [favorites, setFavorites] = useState<Driver[]>([]);

  // Função para buscar os favoritos
  const fetchFavorites = async () => {
    const favoriteDrivers = await getFavorites();
    setFavorites(favoriteDrivers);
  };

  // Recarregar a lista de favoritos toda vez que a aba for acessada
  useFocusEffect(() => {
    fetchFavorites();
  });

  const renderItem = ({ item }: { item: Driver }) => (
    <ThemedView key={item.id} style={styles.card}>
      <Image source={{ uri: item.img }} style={styles.driverImage} />
      <ThemedText type="default" style={styles.textBlack}>{item.nome}</ThemedText>
      <ThemedText type="default" style={styles.textBlack}>Pódios: {item.podiums}</ThemedText>
      <ThemedText type="default" style={styles.textBlack}>Títulos Mundiais: {item.world_championships}</ThemedText>
      <ThemedText type="default" style={styles.textBlack}>Nacionalidade: {item.nationality}</ThemedText>
    </ThemedView>
  );

  return (
    <View style={{ flex: 1 }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Favoritos✨</ThemedText>
      </ThemedView>
  
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.cardContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    top: 30,
  },
  cardContainer: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    width: 160,
    margin: 8,
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignItems: 'center',
    elevation: 3,
  },
  driverImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  textBlack: {
    color: 'black', // Define a cor do texto como preta
  },
});
