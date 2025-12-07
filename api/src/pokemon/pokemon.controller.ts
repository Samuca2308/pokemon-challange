import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { setupCache } from 'axios-cache-adapter';


@Controller('api')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get('search')

  async searchPokemons(
        @Query('name') name: string,
        @Query('limit') limit: number = 10,
        @Query('offset') offset: number = 0
    ) {
    
    if (!name) {
      return { message: 'Please provide a Pokémon name to search for.' };
    }

    return this.pokemonService.searchPokemons(name, limit, offset);
  }

  @Get(':name')

  async getPokemonDetails(@Param('name') name: string) {

    return this.pokemonService.getPokemonDetails(name);
  }
}