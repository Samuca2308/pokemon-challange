import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { PokemonService } from './services/pokemon.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";

describe('App Component', () => {
  let component: App;
  let fixture: ComponentFixture<App>;
  let pokemonServiceMock: jest.Mocked<PokemonService>;
  let routerMock: jest.Mocked<Router>;
  let cdRefMock: jest.Mocked<ChangeDetectorRef>;

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
  })

  beforeEach(() => {
    pokemonServiceMock = {
      getPokemons: jest.fn()
    } as unknown as jest.Mocked<PokemonService>;

    routerMock = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    cdRefMock = {
      detectChanges: jest.fn()
    } as unknown as jest.Mocked<ChangeDetectorRef>;

    TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ChangeDetectorRef, useValue: cdRefMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadPokemons on ngOnInit', () => {
    const loadPokemonsSpy = jest.spyOn(component, 'loadPokemons');

    const mockPokemons = [{ name: 'Pikachu' }, { name: 'Bulbasaur' }];
    pokemonServiceMock.getPokemons.mockReturnValue(of(mockPokemons));

    component.ngOnInit();
    expect(loadPokemonsSpy).toHaveBeenCalled();
  });

  it('should load pokemons when loadPokemons is called', () => {
    const mockPokemons = [{ name: 'Pikachu' }, { name: 'Bulbasaur' }];
    pokemonServiceMock.getPokemons.mockReturnValue(of(mockPokemons));

    component.loadPokemons();

    expect(component.isLoading).toBeFalsy();
    expect(component.pokemons).toEqual(mockPokemons);
  });

  it('should update searchQuery and call loadPokemons when onSearch is called', () => {
    const query = 'Pikachu';
    const loadPokemonsSpy = jest.spyOn(component, 'loadPokemons');

    const mockPokemons = [{ name: 'Pikachu' }, { name: 'Bulbasaur' }];
    pokemonServiceMock.getPokemons.mockReturnValue(of(mockPokemons));

    component.onSearch(query);

    expect(component.searchQuery).toBe(query.toLowerCase());
    expect(loadPokemonsSpy).toHaveBeenCalled();
  });

  it('should update offset and call loadPokemons when loadMore is called', () => {
    component.offset = 10; // initial offset
    const loadPokemonsSpy = jest.spyOn(component, 'loadPokemons');

    const mockPokemons = [{ name: 'Pikachu' }, { name: 'Bulbasaur' }];
    pokemonServiceMock.getPokemons.mockReturnValue(of(mockPokemons));

    component.loadMore();

    expect(component.offset).toBe(20); // offset should increase by limit
    expect(loadPokemonsSpy).toHaveBeenCalled();
  });

  it('should navigate to pokemon details page when routeToPokemon is called', () => {
    const pokemonName = 'Pikachu';
    component.routeToPokemon(pokemonName);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/pokemon', pokemonName]);
  });
});
