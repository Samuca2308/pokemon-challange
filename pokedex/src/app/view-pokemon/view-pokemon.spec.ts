import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPokemon } from './view-pokemon';
import { PokemonService } from '../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";

describe('ViewPokemon Component', () => {
  let component: ViewPokemon;
  let fixture: ComponentFixture<ViewPokemon>;
  let pokemonServiceMock: jest.Mocked<PokemonService>;
  let activatedRouteMock: jest.Mocked<ActivatedRoute>;
  let cdRefMock: jest.Mocked<ChangeDetectorRef>;

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
  })

  beforeEach(() => {
    pokemonServiceMock = {
      getPokemonDetails: jest.fn()
    } as unknown as jest.Mocked<PokemonService>;

    activatedRouteMock = {
      snapshot: {
        paramMap: {
          get: jest.fn()
        }
      },
      url: of([{ path: 'pikachu' }])
    } as unknown as jest.Mocked<ActivatedRoute>;

    cdRefMock = {
      detectChanges: jest.fn()
    } as unknown as jest.Mocked<ChangeDetectorRef>;

    TestBed.configureTestingModule({
      imports: [ViewPokemon],
      providers: [
        { provide: PokemonService, useValue: pokemonServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: ChangeDetectorRef, useValue: cdRefMock },
        TitleCasePipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewPokemon);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getDetails on ngOnInit', () => {
    const getDetailsSpy = jest.spyOn(component, 'getDetails');
    component.ngOnInit();
    expect(getDetailsSpy).toHaveBeenCalled();
  });

  it('should call pokemonService.getPokemonDetails and update pokemon data', () => {
    const mockPokemon = { name: 'Pikachu', type: 'Electric' };
    pokemonServiceMock.getPokemonDetails.mockReturnValue(of(mockPokemon));
    activatedRouteMock.snapshot.paramMap.get.mockReturnValue('pikachu');

    component.ngOnInit();

    expect(pokemonServiceMock.getPokemonDetails).toHaveBeenCalledWith('pikachu');
    expect(component.pokemon).toEqual(mockPokemon);
    expect(component.isLoading).toBeFalsy();
  });

  it('should handle the case when pokemonService.getPokemonDetails fails', () => {
    pokemonServiceMock.getPokemonDetails.mockReturnValue(of(null));
    activatedRouteMock.snapshot.paramMap.get.mockReturnValue('pikachu');

    component.ngOnInit();

    expect(component.pokemon).toBeNull();
    expect(component.isLoading).toBeFalsy();
  });

  it('should subscribe to route URL changes and call getDetails on each change', () => {
    const getDetailsSpy = jest.spyOn(component, 'getDetails');

    activatedRouteMock.url = of([{ path: 'bulbasaur' }]);
    component.getDetails();

    expect(getDetailsSpy).toHaveBeenCalled();
  });
});
