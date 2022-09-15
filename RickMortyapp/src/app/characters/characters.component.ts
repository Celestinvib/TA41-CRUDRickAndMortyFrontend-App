import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  characters: any = null;

  constructor(private charactersService: CharactersService) {}

  ngOnInit(): void {

      this.charactersService.returnCharacters()
      .subscribe(
        (result) => {
          this.characters = result;
        },
        (error) => {
          console.log('There has been a problem');
        }
      );
  }

}
