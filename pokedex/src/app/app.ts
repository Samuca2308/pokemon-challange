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

  loadPokemons(append: boolean = false): void {
    this.isLoading = true;
    this.pokemonService.getPokemons(this.searchQuery, this.offset, this.limit).subscribe((data) => {
      if (typeof data[Symbol.iterator] === 'function') {
        if (append) {
          this.pokemons = [...this.pokemons, ...data];
        } else {
          this.pokemons = [...data]
        }
      } else {
        this.pokemons = []
      }
      this.isLoading = false;
      this.cdRef.detectChanges();
    });
  }

  onSearch(query: string): void {
    this.offset = 0;
    this.searchQuery = query.toLowerCase();
    this.loadPokemons();
  }

  loadMore(): void {
    this.offset += this.limit;
    this.loadPokemons(true);
  }

  routeToPokemon(pokemon: string): void {
    this.router.navigate(['/pokemon', pokemon]);
  }
}
