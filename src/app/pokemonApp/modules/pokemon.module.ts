import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from '../components/pokemon-list/pokemon-list.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FiltroPipe } from '../pipes/filtro.pipe'; 
import { ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PokemonComponent } from './pokemon.component';
import { PokeDetailsComponent } from '../components/poke-details/poke-details.component';

@NgModule({
  declarations: [
    PokemonListComponent,
    PokeDetailsComponent,
    FiltroPipe,
    NavbarComponent,
    PokemonComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule, 
    MatInputModule,
  ],
  exports: [
    PokemonListComponent,
    PokeDetailsComponent,
    PokemonComponent,
    NavbarComponent,
    FiltroPipe,
  ],
  providers:[FiltroPipe]
})

export class PokemonModule { }
