import { Component, ViewChild, OnInit } from "@angular/core";
import { PokemonDetails } from "../../models";
import { PokeDetailsComponent } from "../poke-details/poke-details.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { capturaPokemonService} from "../../services";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
})

export class NavbarComponent implements OnInit {
  public capturaPokemon: PokemonDetails = {} as PokemonDetails;
  public capturaPokemonIds: string[] = [];
  public capturaPokemonName: string = "";
  public iscaptura: boolean = false;
  public isPokemonDeleted: boolean = false;
  capturados: any[] = [];

  @ViewChild("pokeDetails") pokeDetailsComponent?: PokeDetailsComponent;

  @ViewChild("capturaModal") capturaModal: any;

  constructor(
    private modalService: NgbModal,
    private capturaPokemonService: capturaPokemonService
  ) {}

  ngOnInit() {
    this.getCapturaPokemon();
    this.capturaPokemonIds = this.capturaPokemonService.getCapturaPokemonIds();
    this.pokeDetailsComponent?.capturaPokeSelected.subscribe(
      (pokemon: PokemonDetails) => {
        this.onCapturaPokeSelected(pokemon);
      }
      );
    }
    
    updateCapturaPokemonName(pokemonName: string) {
      this.capturaPokemonName = pokemonName;
  }

  openCapturaModal(content: any, pokemon: PokemonDetails | null) {
    if (pokemon && pokemon.name && pokemon.height && pokemon.weight) {
      this.capturaPokemon = pokemon;
    } else {
      this.getCapturaPokemon();
      
    }
    if (this.pokeDetailsComponent) {
      this.pokeDetailsComponent.chooseCaptura();
    }

    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        if (this.isPokemonDeleted) {
          // Si libero el Pokemon capturado, establecer como objeto vacío
          this.capturaPokemon = {} as PokemonDetails;
          this.isPokemonDeleted = false;
        }
        this.capturaModal.componentInstance.pokeDetailsComponent.resetCaptura();
      },
      (reason) => {
        if (this.isPokemonDeleted) {
          // Si se eliminó el Pokemon favorito, establecer como objeto vacío
          this.capturaPokemon = {} as PokemonDetails;
          this.isPokemonDeleted = false;
        }
        this.capturaModal.componentInstance.pokeDetailsComponent.resetCaptura();
      }
    );
  }

  closeCapturaModal() {
    this.capturaPokemon = {} as PokemonDetails;
  }

  onCapturaPokeSelected(pokemon: PokemonDetails | null) {
    this.capturaPokemon = pokemon || ({} as PokemonDetails);
    const capturaButton = document.getElementById("captura-button");
    if (capturaButton) {
      capturaButton.innerHTML = `Pokemon Favorito <span class="fs-5">${
        this.capturaPokemon.name
          ? this.capturaPokemon.name.toUpperCase()
          : "No hay capturados"
      }</span>`;
    }
  }

  resetCapturaModal() {
    this.capturaPokemon = {} as PokemonDetails;
    if (this.pokeDetailsComponent) {
      this.pokeDetailsComponent.resetCaptura();
    }
  }

  removeCapturaPokemon(pokemonId: number) {
    const idStr = pokemonId.toString();
    this.capturaPokemonService.removeCapturaPokemon(parseInt(idStr));
    this.capturaPokemonIds = this.capturaPokemonService.getCapturaPokemonIds();
    if (this.capturaPokemon.id === pokemonId) {
      this.capturaPokemon = {} as PokemonDetails;
    }
    this.resetCapturaModal();
  }

  private getCapturaPokemon() {
    const capturaPokemon = this.capturaPokemonService.getCapturaPokemon();
    if (capturaPokemon) {
      this.capturaPokemon = capturaPokemon;
    } else {
      this.capturaPokemon = {} as PokemonDetails;
    }
  }
}
