import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../characters.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Character } from '../models/character.model';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  character: Character= {
    name: '',
    status:'',
    species:'',
    gender:'',
    origin:'',
    image:''
  }


  charId: number = 1;

  editMode:boolean= false;

  role:string | undefined;

  token : string | null | undefined;


  constructor(
    private route: ActivatedRoute,
    private charactersService: CharactersService,
    private router: Router,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {


    this.token = this.tokenStorage.getToken();

    if (this.token != null)
    {
      this.role = this.tokenStorage.getRole()?.toString();
      console.log(this.role);

      this.route.queryParams
        .subscribe(params => {
          console.log(params); // { id: 1 }
          this.charId = params['id'];
        }

      );


      this.getCharacter();
    }

  }

  getCharacter() {

    this.charactersService.returnCharacter(this.charId)
      .subscribe(
        (data) => {
          this.character = data;
        },
        (error) => {
          console.log('There has been a problem');
        }
      );
  }

  updateCharacter(): void {
    this.charactersService.update(this.character.id, this.character)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/characters']);
      },
      error => {
        console.log(error);

      }
    )
  }

  deleteCharacter(): void {
    this.charactersService.delete(this.character.id)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/characters']);
      }
    )
  }

  changeEditMode(): void {
    this.editMode = !this.editMode;

    if(!this.editMode){ this.getCharacter(); }
  }
}
