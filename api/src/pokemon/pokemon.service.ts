import { Injectable } from '@nestjs/common';
import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ISetupCache, setupCache } from 'axios-cache-adapter';

@Injectable()
export class PokemonService {

  private readonly baseUrl = 'https://pokeapi.co/api/v2/';
  private cache: ISetupCache;

  constructor() {
    this.cache = setupCache({
      maxAge: 60 * 60 * 1000,
    });
  }

  async searchPokemons(query: string, limit: number, offset: number) {
    try {
      const interval = [offset, (Number(offset) + Number(limit))];
      const config: AxiosRequestConfig = {
        adapter: this.cache.adapter,
        params: {
          'limit': 1200,
          'offset': 0
        },
      };

      const response: AxiosResponse<any> = await axios.get(`${this.baseUrl}pokemon`, config);
      const pokemons = response.data.results.filter(pokemon => pokemon.name.toLowerCase().includes(query.toLowerCase()));

      return pokemons.slice(...interval);
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching pokemons');
    }
  }

  async getPokemonDetails(name: string) {
    try {
      const response = await axios.get(`${this.baseUrl}pokemon/${name}`);
      return response.data;

    } catch (error) {
      console.error(error);
      throw new Error('Error fetching details');
    }
  }
}