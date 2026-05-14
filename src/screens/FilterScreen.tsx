import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useGetPokemonTypesQuery } from '../services/pokemonApi';

const FilterScreen = ({ navigation, route }: any) => {
  const { data } = useGetPokemonTypesQuery(null);
  const selected = route.params?.selectedType || 'all';

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={() => navigation.goBack()} />
      <View style={styles.sheet}>
        <Text style={styles.title}>Select Type</Text>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('PokeHome', { selectedType: 'all' })}>
          <Ionicons name={selected === 'all' ? "radio-button-on" : "radio-button-off"} size={22} color="blue" />
          <Text style={selected === 'all' ? styles.selText : styles.text}>All Pokémon</Text>
        </TouchableOpacity>
        <FlatList
          data={data?.results}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('PokeHome', { selectedType: item.name })}>
              <Ionicons name={selected === item.name ? "radio-button-on" : "radio-button-off"} size={22} color="blue" />
              <Text style={selected === item.name ? styles.selText : styles.text}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  sheet: { backgroundColor: 'white', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '60%' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 0.5, borderBottomColor: '#eee', gap: 10 },
  text: { fontSize: 16, textTransform: 'capitalize' },
  selText: { fontSize: 16, color: 'blue', fontWeight: 'bold', textTransform: 'capitalize' }
});

export default FilterScreen;