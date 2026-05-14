import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL } from "../services/baseUrl";

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASEURL  }),
  endpoints: (builder) => ({
    getPokemonList: builder.query({
      // Requirement: Pagination with limit 10
      query: (offset = 0) => `pokemon?limit=10&offset=${offset}`,
    }),
    getPokemonTypes: builder.query({
      query: () => 'type',
    }),
    getPokemonByType: builder.query({
      query: (type) => `type/${type}`,
    }),
    getPokemonDetails: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { 
  useGetPokemonListQuery, 
  useGetPokemonTypesQuery, 
  useGetPokemonByTypeQuery, 
  useGetPokemonDetailsQuery 
} = pokemonApi;