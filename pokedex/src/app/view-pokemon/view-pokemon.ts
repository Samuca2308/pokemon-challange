import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-view-pokemon',
  imports: [TitleCasePipe],
  templateUrl: './view-pokemon.html',
  styleUrl: './view-pokemon.scss',
})

export class ViewPokemon implements OnInit {
  pokemon: any;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails(): void {
    this.route.url.subscribe(() => {
      const pokemonName = this.route.snapshot.paramMap.get('name')!;
      this.pokemonService.getPokemonDetails(pokemonName).subscribe((data) => {
        this.pokemon = data;
        this.isLoading = false;
        this.cdRef.detectChanges();
      });
    });
  }
}
