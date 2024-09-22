import Driver from "@/models/driver";

const FAVORITES_KEY = 'favoritesList';



const getStoredFavorites = () => {
    const storedFavorites = localStorage.getItem(FAVORITES_KEY);
    return storedFavorites ? JSON.parse(storedFavorites) : [];
};

const saveFavorites = (favoritesList: Driver[]) => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesList));
};

export const getFavorites = () => {
    return getStoredFavorites();
};

export const addFavorite = (driver: Driver) => {
    const favoritesList = getStoredFavorites();
    if (!isFavorite(driver)) {
        favoritesList.push(driver);
        saveFavorites(favoritesList);
    }
};

export const removeFavorite = (driver: Driver) => {
    let favoritesList = getStoredFavorites();
    favoritesList = favoritesList.filter((item: Driver) => item.id !== driver.id);
    saveFavorites(favoritesList);
};

export const removeByName = (name: string) => {
    let favoritesList = getStoredFavorites();
    favoritesList = favoritesList.filter((item: Driver) => item.nome !== name);
    saveFavorites(favoritesList);
}

export const isFavorite = (driver: Driver) => {
    const favoritesList = getStoredFavorites();
    return favoritesList.some((item: Driver) => item.id === driver.id);
};