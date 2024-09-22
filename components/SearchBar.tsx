import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

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

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={query}
                onChangeText={handleInputChange}
                placeholder={placeholder}
                onSubmitEditing={handleSearch}
            />
            <Button title="Search" onPress={handleSearch} />
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
        color: 'white',
    },
});

export default SearchBar;
