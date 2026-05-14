import React, { useState, useMemo, useEffect } from 'react';
import {
    View, FlatList, TextInput, TouchableOpacity, Text,
    StyleSheet, RefreshControl, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGetPokemonListQuery, useGetPokemonByTypeQuery } from '../services/pokemonApi';
import PokemonCard from '../components/PokemonCard';

const HomeScreen = ({ navigation, route }: any) => {
    const [isGridView, setIsGridView] = useState(true);
    const [search, setSearch] = useState('');
    const [offset, setOffset] = useState(0);
    const [allPokemon, setAllPokemon] = useState<any[]>([]);

    const selectedType = route.params?.selectedType || 'all';

    // API Hooks
    const { data: listData, isFetching: listFetching, refetch } =
        useGetPokemonListQuery(offset, { skip: selectedType !== 'all' });

    const { data: typeData, isFetching: typeFetching } =
        useGetPokemonByTypeQuery(selectedType, { skip: selectedType === 'all' });

    // Data Merging for Pagination
    useEffect(() => {
        if (selectedType === 'all' && listData) {
            if (offset === 0) setAllPokemon(listData.results);
            else setAllPokemon(prev => [...prev, ...listData.results]);
        } else if (selectedType !== 'all' && typeData) {
            setAllPokemon(typeData.pokemon.map((p: any) => p.pokemon));
        }
    }, [listData, typeData, selectedType]);

    // Reset logic when type changes
    useEffect(() => {
        setOffset(0);
        setAllPokemon([]);
    }, [selectedType]);

    const filteredData = useMemo(() =>
        allPokemon.filter(p => p.name.toLowerCase().includes(search.toLowerCase())),
        [allPokemon, search]
    );

    const loadMore = () => {
        if (selectedType === 'all' && !listFetching && listData?.next) {
            setOffset(prev => prev + 10);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#999" />
                    <TextInput
                        placeholder="Search Pokémon..."
                        style={styles.input}
                        onChangeText={setSearch}
                    />
                </View>
                <TouchableOpacity style={styles.iconBtn} onPress={() => setIsGridView(!isGridView)}>
                    <Ionicons name={isGridView ? "list" : "grid"} size={24} color="white" />
                </TouchableOpacity>
            </View>

            <FlatList
                key={isGridView ? 'G' : 'L'}
                numColumns={isGridView ? 2 : 1}
                data={filteredData}
                keyExtractor={(item, index) => item.name + index}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl refreshing={listFetching || typeFetching} onRefresh={() => setOffset(0)} />
                }
                renderItem={({ item }) => (
                    <PokemonCard name={item.name} isGrid={isGridView} navigation={navigation} />
                )}
                ListFooterComponent={() =>
                    (listFetching && offset !== 0) ? <ActivityIndicator size="small" color="#000" /> : null
                }
                initialNumToRender={10}       
                maxToRenderPerBatch={10}     
                windowSize={5}                
                removeClippedSubviews={true}  
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { flexDirection: 'row', padding: 15, backgroundColor: '#fff', alignItems: 'center', elevation: 4 },
    searchBar: { flex: 1, flexDirection: 'row', backgroundColor: '#eee', borderRadius: 10, paddingHorizontal: 10, alignItems: 'center', marginRight: 10 },
    input: { flex: 1, height: 40, marginLeft: 5 },
    iconBtn: { backgroundColor: '#333', padding: 10, borderRadius: 10 },
});

export default HomeScreen;