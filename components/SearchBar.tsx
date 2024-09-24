import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Appearance } from 'react-native';

interface SearchBarProps {
    placeholder?: string;
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", onSearch }) => {
    const [query, setQuery] = useState("");

    const handleInputChange = (text: string) => {
        setQuery(text);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    // Detect the current color scheme (light or dark)
    const colorScheme = Appearance.getColorScheme();
    const inputTextColor = colorScheme === 'dark' ? 'white' : 'black';

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, { color: inputTextColor }]}
                value={query}
                onChangeText={handleInputChange}
                placeholder={placeholder}
                onSubmitEditing={handleSearch}
                placeholderTextColor={inputTextColor === 'black' ? '#aaa' : '#777'}
            />
            <Button title="Buscar" onPress={handleSearch} color="#a00000" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginRight: 8,
    },
});

export default SearchBar;
