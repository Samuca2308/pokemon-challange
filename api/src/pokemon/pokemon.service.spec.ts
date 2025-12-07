import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import axios from 'axios';

jest.mock('axios');

describe('PokemonService', () => {
  let service: PokemonService;
  let mockAxiosGet: jest.Mock;

  beforeEach(async () => {
    mockAxiosGet = axios.get as jest.Mock;

    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonService],
    }).compile();


    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('searchPokemons', () => {
    it('should return pokemons matching the query', async () => {

      mockAxiosGet.mockResolvedValue({
        data: {
          results: [
            { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
            { name: 'ekans', url: 'https://pokeapi.co/api/v2/pokemon/23/' },
            { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
            { name: 'absol', url: 'https://pokeapi.co/api/v2/pokemon/359/' },
            { name: 'pikipek', url: 'https://pokeapi.co/api/v2/pokemon/731/' },
          ],
        },
      });


      const result = await service.searchPokemons('pik', 2, 0);

      expect(result).toEqual([
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
        { name: 'pikipek', url: 'https://pokeapi.co/api/v2/pokemon/731/' }
      ]);
    });

    it('should return an empty array if no pokemons match', async () => {
      mockAxiosGet.mockResolvedValue({
        data: {
          results: [
            { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
          ],
        },
      });

      const result = await service.searchPokemons('xyz', 10, 0);
      expect(result).toEqual([]);
    });

    it('should handle pagination with an offset and limit', async () => {
      mockAxiosGet.mockResolvedValue({
        data: {
          results: [
            { name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
            { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
            { name: 'pidgey', url: 'https://pokeapi.co/api/v2/pokemon/17/' },
            { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
            { name: 'absol', url: 'https://pokeapi.co/api/v2/pokemon/359/' },
            { name: 'pikipek', url: 'https://pokeapi.co/api/v2/pokemon/731/' },
          ],
        },
      });

      const result = await service.searchPokemons('p', 3, 0);
      expect(result).toEqual([
        { name: 'pidgey', url: 'https://pokeapi.co/api/v2/pokemon/17/' },
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
        { name: 'pikipek', url: 'https://pokeapi.co/api/v2/pokemon/731/' },
      ]);
    });

    it('should throw an error if there is an issue fetching data', async () => {
      mockAxiosGet.mockRejectedValue(new Error('API Error'));

      await expect(service.searchPokemons('pik', 10, 0)).rejects.toThrow('Error fetching pokemons');
    });
  })

  describe('getPokemonDetails', () => {
    it('should return detailed information about a pokemon', async () => {
      mockAxiosGet.mockResolvedValue({
        data: {
          id: 25,
          name: 'pikachu',
          height: 4,
          weight: 60,
          types: [{ type: { name: 'electric' } }],
        },
      });

      const result = await service.getPokemonDetails('pikachu');
      expect(result).toEqual({
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        types: [{ type: { name: 'electric' } }],
      });
    });

    it('should throw an error if there is an issue fetching data', async () => {
      mockAxiosGet.mockRejectedValue(new Error('API Error'));

      await expect(service.getPokemonDetails('pikachu')).rejects.toThrow('Error fetching details');
    });
  });
});