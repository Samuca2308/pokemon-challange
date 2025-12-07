// src/app/app.component.ts
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    RouterModule,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})

export class App implements OnInit {
  private router = inject(Router);
  pokemons: any[] = [];
  searchQuery: string = '';
  offset: number = 0;
  limit: number = 10;
  isLoading: boolean = false;

  constructor(
    private pokemonService: PokemonService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.isLoading = true;
    this.pokemonService.getPokemons(this.searchQuery, this.offset, this.limit).subscribe((data) => {
      if (typeof data[Symbol.iterator] === 'function') {
        this.pokemons = [...this.pokemons, ...data];
      }
      this.offset += this.limit;
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query.toLowerCase();
    this.loadPokemons();
  }

  routeToPokemon(pokemon: string): void {
    this.router.navigate(['/pokemon', pokemon]);
  }
}
