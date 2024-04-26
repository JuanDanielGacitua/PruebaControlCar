import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnChanges} from "@angular/core";
import { Pokemon, PokemonDetails } from "../../models";
import { capturaPokemonService } from "../../services";

@Component({
  selector: "app-poke-details",
  templateUrl: "./poke-details.component.html",
})
export class PokeDetailsComponent {
  @Input() pokemonDetails?: PokemonDetails;
  @Output() capturaPokeSelected = new EventEmitter<PokemonDetails>();
  capturados: Pokemon[] = [];
  maximoCapturados: number = 6;
  public isCaptura: boolean = false;
  public isAddCapturaDisabled: boolean = false;
  public capturaRemoved: boolean = false;
  

  constructor(private elementRef:ElementRef , 
    private capturaPokemonService : capturaPokemonService){this.capturaPokemonService.getResetCaptura().subscribe(() => {
      this.resetCaptura();
      });}

  @ViewChild('exampleModal') exampleModal!: ElementRef;

  
  ngOnChanges() {
    this.resetCaptura();
    this.isAddCapturaDisabled = false;
  }
  
  ngOnInit() {
    if (this.pokemonDetails) {
      this.isCaptura = this.capturaPokemonService.isCapturaPokemon(this.pokemonDetails.id.toString());
      this.isAddCapturaDisabled = this.isCaptura;
    }
  }
  
  chooseCaptura() {
    this.isCaptura = !this.isCaptura;
    if (this.isCaptura && this.pokemonDetails) {
      this.capturaPokemonService.setCapturaPokemon(this.pokemonDetails);
      this.capturaPokeSelected.emit(this.pokemonDetails);
      this.isAddCapturaDisabled = true;
    } else {
      this.capturaPokemonService.removeCapturaPokemon(
        parseInt(this.pokemonDetails?.id.toString() || "")
      );
      this.isAddCapturaDisabled = false;
    }
  }


  onAddCaptura( ){
    if (this.pokemonDetails && this.capturados.length < this.maximoCapturados) {
       // Verifica si pokemonDetails está definido y no es nulo
      // Si pokemonDetails está definido, continúa con el proceso
      const nuevoPokemon: Pokemon = {
        id: this.pokemonDetails.id.toString(),
        name: this.pokemonDetails.name,
        pic: this.pokemonDetails.pic
      };
      this.capturaPokemonService.setCapturaPokemon(this.pokemonDetails);
      // Llama al método setCapturaPokemon() del servicio capturaPokemonService
      // para registrar la captura del Pokémon actual utilizando los detalles del Pokémon (this.pokemonDetails)
      this.capturados.push(nuevoPokemon);
      // Establece la variable isCaptura en true
      // Esto indica que el Pokémon ha sido capturado
      // Verifica si se ha alcanzado el límite máximo de Pokémon capturados
    if (this.capturados.length === this.maximoCapturados) {
      // Desactiva la opción para agregar más capturas
      this.isAddCapturaDisabled = true;
      // Establece la variable isAddCapturaDisabled en true
      // Esto deshabilita la opción para agregar la captura del Pokémon
    }



  }
  }

  resetCaptura() {
    this.isCaptura = false;
    this.isAddCapturaDisabled = false
  }
}

