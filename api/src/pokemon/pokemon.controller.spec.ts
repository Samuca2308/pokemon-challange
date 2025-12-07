import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

jest.mock('./pokemon.service');

describe('PokemonController', () => {
  let controller: PokemonController;
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [PokemonService],
    }).compile();


    controller = module.get<PokemonController>(PokemonController);
    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('searchPokemons', () => {
    it('should return pokemons matching the query', async () => {

      const result = [
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
        { name: 'pikipek', url: 'https://pokeapi.co/api/v2/pokemon/731/' },
      ];

      jest.spyOn(service, 'searchPokemons').mockResolvedValue(result);


      expect(await controller.searchPokemons({ name: 'pik', limit: 2, offset: 0 })).toBe(result);
    });
  });

  describe('getPokemonDetails', () => {
    it('should return detailed information about a pokemon', async () => {

      const result = {
        id: 25,
        name: 'pikachu',
        height: 4,
        weight: 60,
        types: [{ type: { name: 'electric' } }],
      };

      jest.spyOn(service, 'getPokemonDetails').mockResolvedValue(result);


      expect(await controller.getPokemonDetails('pikachu')).toBe(result);
    });
  });
});