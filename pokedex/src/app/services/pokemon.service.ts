import { Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {
  private apiUrl = '/api';

  constructor(private http: HttpClient) {}

  getPokemons(query: string, offset: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?name=${query}&offset=${offset}&limit=${limit}`).pipe(
      debounceTime(300),
      distinctUntilChanged()
    );
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${name}`);
  }
}