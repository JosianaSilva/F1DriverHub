import AsyncStorage from '@react-native-async-storage/async-storage';
import Driver from "@/models/driver";

const FAVORITES_KEY = 'favoritesList';

// Função para recuperar a lista de favoritos do AsyncStorage
const getStoredFavorites = async (): Promise<Driver[]> => {
    try {
        const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
        console.error('Error fetching favorites:', error);
        return [];
    }
};

// Função para salvar a lista de favoritos no AsyncStorage
const saveFavorites = async (favoritesList: Driver[]): Promise<void> => {
    try {
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesList));
    } catch (error) {
        console.error('Error saving favorites:', error);
    }
};

// Recuperar lista de favoritos
export const getFavorites = async (): Promise<Driver[]> => {
    return await getStoredFavorites();
};

// Adicionar um driver à lista de favoritos
export const addFavorite = async (driver: Driver): Promise<void> => {
    try {
        const favoritesList = await getStoredFavorites();
        if (!favoritesList.some(item => item.id === driver.id)) {
            const updatedList = [...favoritesList, driver]; // Cria nova lista sem modificar diretamente
            await saveFavorites(updatedList);
        }
    } catch (error) {
        console.error('Error adding favorite:', error);
    }
};

// Remover um driver da lista de favoritos
export const removeFavorite = async (driver: Driver): Promise<void> => {
    try {
        const favoritesList = await getStoredFavorites();
        const updatedList = favoritesList.filter((item: Driver) => item.id !== driver.id);
        await saveFavorites(updatedList);
    } catch (error) {
        console.error('Error removing favorite:', error);
    }
};

// Remover um driver da lista de favoritos por nome
export const removeByName = async (name: string): Promise<void> => {
    try {
        const favoritesList = await getStoredFavorites();
        const updatedList = favoritesList.filter((item: Driver) => item.nome !== name);
        await saveFavorites(updatedList);
    } catch (error) {
        console.error('Error removing by name:', error);
    }
};

// Verificar se um driver está na lista de favoritos
export const isFavorite = async (driver: Driver): Promise<boolean> => {
    try {
        const favoritesList = await getStoredFavorites();
        return favoritesList.some((item: Driver) => item.id === driver.id);
    } catch (error) {
        console.error('Error checking if favorite:', error);
        return false;
    }
};
