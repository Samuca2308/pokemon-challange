import { Routes } from '@angular/router';
import { ViewPokemon } from './view-pokemon/view-pokemon';
import { Placeholder } from './placeholder/placeholder';

export const routes: Routes = [
  { path: '', component: Placeholder },
  { path: 'pokemon/:name', component: ViewPokemon },
  { path: '**', component: Placeholder }
];