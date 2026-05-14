import React, { memo } from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  Image, 
  View, 
  ActivityIndicator 
} from 'react-native';
import { useGetPokemonDetailsQuery } from '../services/pokemonApi';

interface PokemonCardProps {
  name: string;
  isGrid: boolean;
  navigation: any;
}

const PokemonCard = ({ name, isGrid, navigation }: PokemonCardProps) => {
  const { data, isLoading } = useGetPokemonDetailsQuery(name);

  return (
    <TouchableOpacity 
      style={[
        styles.card, 
        isGrid ? styles.gridCard : styles.listCard
      ]}
      onPress={() => navigation.navigate('Details', { pokemonName: name })}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#000" />
      ) : (
        <>
          <Image 
            source={{ uri: data?.sprites?.other['official-artwork']?.front_default || data?.sprites?.front_default }} 
            style={isGrid ? styles.gridImage : styles.listImage}
            resizeMode="contain"
          />
          <View style={styles.infoContainer}>
            <Text style={styles.idText}>#{String(data?.id).padStart(3, '0')}</Text>
            <Text style={styles.nameText}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
            
            <View style={styles.typeRow}>
              {data?.types.map((t: any) => (
                <View key={t.type.name} style={styles.typeBadge}>
                  <Text style={styles.typeText}>{t.type.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    margin: 8,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  gridCard: {
    flex: 1,
    height: 180,
  },
  listCard: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
  },
  gridImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  listImage: {
    width: 70,
    height: 70,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  idText: {
    fontSize: 12,
    color: '#999',
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'capitalize',
  },
  typeRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  typeBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    marginRight: 5,
  },
  typeText: {
    fontSize: 10,
    color: '#666',
    textTransform: 'uppercase',
  },
});


export default memo(PokemonCard);