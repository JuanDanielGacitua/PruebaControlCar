import { Injectable } from "@angular/core";
import { PokemonDetails } from "../models";
import { Subject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class capturaPokemonService {
  private capturaPokemon: PokemonDetails | null = null;
  private capturaPokemonIds: string[] = [];
  private resetCaptura = new Subject<void>();

  constructor() {}

  getCapturaPokemonIds(): string[] {
    return this.capturaPokemonIds;
  }

  getCapturaPokemon(): PokemonDetails | null {
    return this.capturaPokemon;
  }

  setCapturaPokemon(pokemon: PokemonDetails): void {
    this.capturaPokemon = pokemon;
    this.capturaPokemonIds.push(pokemon.id.toString());
  }

  removeCapturaPokemon(id: number) {
    const index = this.capturaPokemonIds.indexOf(id.toString());
    if (index !== -1) {
      this.capturaPokemonIds.splice(index, 1);
      this.resetCaptura.next();
    }
  }

  isCapturaPokemon(pokemonId: string): boolean {
    return this.capturaPokemonIds.includes(pokemonId);
  }

  getResetCaptura(): Observable<void> {
    return this.resetCaptura.asObservable();
  }
}
