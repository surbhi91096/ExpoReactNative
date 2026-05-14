import 'react-native-gesture-handler';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { store } from './src/services/store';
import { useGetPokemonTypesQuery } from './src/services/pokemonApi';

import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import FilterScreen from './src/screens/FilterScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const FilterButton = () => {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Filter')} style={{ marginRight: 15 }}>
      <Ionicons name="options-outline" size={24} color="black" />
    </TouchableOpacity>
  );
};

function DrawerNavigator() {
  const { data } = useGetPokemonTypesQuery(null);

  return (
    // <Drawer.Navigator screenOptions={{ headerRight: () => <FilterButton /> }}>
    //   <Drawer.Screen 
    //     name="All" 
    //     component={HomeScreen} 
    //     initialParams={{ selectedType: 'all' }} 
    //     options={{ drawerIcon: () => <Ionicons name="apps" size={20} /> }}
    //   />
    //   {/* Requirement 2 & 4: Types in Drawer navigation */}
    //   {data?.results.map((type: any) => (
    //     <Drawer.Screen 
    //       key={type.name}
    //       name={type.name} 
    //       component={HomeScreen} 
    //       initialParams={{ selectedType: type.name }}
    //       options={{ 
    //         drawerLabel: type.name.toUpperCase(),
    //         drawerIcon: () => <Ionicons name="egg-outline" size={20} color="#6890F0" />
    //       }}
    //     />

        
    //   ))}
    // </Drawer.Navigator>
    <Drawer.Navigator screenOptions={{ headerRight: () => <FilterButton /> }}>
      <Drawer.Screen 
        name="PokeHome" 
        component={HomeScreen} 
        initialParams={{ selectedType: 'all' }} 
        options={{ title: 'All Pokémon' }}
      />
      
      {data?.results.map((type: any) => (
        <Drawer.Screen 
          key={type.name}
          name={type.name} 
          component={HomeScreen} 
          initialParams={{ selectedType: type.name }}
        />
      ))}
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Pokémon Stats' }} />
          <Stack.Screen 
            name="Filter" 
            component={FilterScreen} 
            options={{ presentation: 'transparentModal', headerShown: false }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}