import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from './pokemonApi';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
      immutableCheck: false,    
    }).concat(pokemonApi.middleware),
});