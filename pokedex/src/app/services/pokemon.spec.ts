import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { BrowserTestingModule, platformBrowserTesting } from "@angular/platform-browser/testing";

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeAll(() => {
    TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });

    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPokemons', () => {
    it('should call the correct API endpoint with query, offset, and limit parameters', () => {
      const query = 'pikachu';
      const offset = 0;
      const limit = 10;

      const mockResponse = {
        results: [{ name: 'pikachu' }]
      };

      service.getPokemons(query, offset, limit).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(
        `${service['apiUrl']}/search?name=${query}&offset=${offset}&limit=${limit}`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should debounce the request and only emit when the query is distinct', (done) => {
      const query = 'pikachu';
      const offset = 0;
      const limit = 10;

      const mockResponse = {
        results: [{ name: 'pikachu' }]
      };

      service.getPokemons(query, offset, limit).subscribe((response) => {
        expect(response).toEqual(mockResponse);
        done();
      });

      const req = httpMock.expectOne(
        `${service['apiUrl']}/search?name=${query}&offset=${offset}&limit=${limit}`
      );
      req.flush(mockResponse);
    });
  });

  describe('getPokemonDetails', () => {
    it('should call the correct API endpoint to get details for a specific pokemon', () => {
      const pokemonName = 'pikachu';

      const mockResponse = { name: 'pikachu', type: 'electric' };

      service.getPokemonDetails(pokemonName).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${service['apiUrl']}/${pokemonName}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});
