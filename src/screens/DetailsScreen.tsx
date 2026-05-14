import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useGetPokemonDetailsQuery } from '../services/pokemonApi';
import { ActivityIndicator } from 'react-native';

const { width } = Dimensions.get('window');

const DetailsScreen = ({ route }: any) => {
  const { pokemonName } = route.params;
  const { data, isLoading } = useGetPokemonDetailsQuery(pokemonName);

  if (isLoading) return <View style={styles.loader}><ActivityIndicator size="large" /></View>;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageContainer}>
        <View style={styles.circle} />
        <Image 
          source={{ uri: data?.sprites?.other['official-artwork']?.front_default }} 
          style={styles.image} 
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{data?.name.toUpperCase()}</Text>
        
        <View style={styles.typeRow}>
          {data?.types.map((t: any) => (
            <View key={t.type.name} style={[styles.badge, { backgroundColor: '#6890F0' }]}>
              <Text style={styles.badgeText}>{t.type.name}</Text>
            </View>
          ))}
        </View>

        <View style={styles.infoBox}>
          <View style={styles.infoItem}>
            <Text style={styles.infoVal}>{data?.weight / 10}kg</Text>
            <Text style={styles.infoLab}>Weight</Text>
          </View>
          <View style={[styles.infoItem, styles.borderLeft]}>
            <Text style={styles.infoVal}>{data?.height / 10}m</Text>
            <Text style={styles.infoLab}>Height</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Base Stats</Text>
        {data?.stats.map((s: any) => (
          <View key={s.stat.name} style={styles.statLine}>
            <Text style={styles.statName}>{s.stat.name.replace('-', ' ')}</Text>
            <View style={styles.barBg}>
              <View style={[styles.barFill, { width: `${(s.base_stat / 255) * 100}%` }]} />
            </View>
            <Text style={styles.statValue}>{s.base_stat}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  loader: { flex: 1, justifyContent: 'center' },
  imageContainer: { height: 300, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2' },
  circle: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.5)' },
  image: { width: 220, height: 220 },
  content: { padding: 25, marginTop: -30, backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  name: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', color: '#333' },
  typeRow: { flexDirection: 'row', justifyContent: 'center', marginVertical: 15 },
  badge: { paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginHorizontal: 5 },
  badgeText: { color: '#fff', fontWeight: 'bold', textTransform: 'capitalize' },
  infoBox: { flexDirection: 'row', backgroundColor: '#f8f8f8', borderRadius: 15, padding: 20, marginVertical: 20 },
  infoItem: { flex: 1, alignItems: 'center' },
  borderLeft: { borderLeftWidth: 1, borderLeftColor: '#ddd' },
  infoVal: { fontSize: 18, fontWeight: 'bold' },
  infoLab: { fontSize: 12, color: '#999', marginTop: 5 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#333' },
  statLine: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  statName: { width: 100, fontSize: 14, textTransform: 'capitalize', color: '#666' },
  barBg: { flex: 1, height: 8, backgroundColor: '#eee', borderRadius: 4, marginHorizontal: 10 },
  barFill: { height: 8, backgroundColor: '#48D0B0', borderRadius: 4 },
  statValue: { width: 30, textAlign: 'right', fontWeight: 'bold' }
});

export default DetailsScreen;