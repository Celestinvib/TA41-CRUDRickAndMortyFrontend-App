import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../characters.service';
import {  Router } from '@angular/router';
import { Character } from '../models/character.model';

@Component({
  selector: 'app-character-add',
  templateUrl: './character-add.component.html',
  styleUrls: ['./character-add.component.css']
})
export class CharacterAddComponent implements OnInit {

  character: Character = {
    name: '',
    status:'',
    species:'',
    gender:'',
    origin:'',
    image:'https://rickandmortyapi.com/api/character/avatar/19.jpeg'
  }

  constructor(
    private charactersService: CharactersService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  saveCharacter(): void {
    const data = {
      name: this.character.name,
      status: this.character.status,
      species:this.character.species,
      gender: this.character.gender,
      origin: this.character.origin,
      image:this.character.image
    }

    this.charactersService.create(data)
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
}
