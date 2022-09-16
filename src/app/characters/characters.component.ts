import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../characters.service';
import { TokenStorageService } from '../services/token-storage.service';


@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  characters: any = null;

  role:string | undefined;

  token : string | null | undefined;

  constructor(private charactersService: CharactersService,
    private tokenStorage: TokenStorageService) {}

  ngOnInit(): void {

    this.token = this.tokenStorage.getToken();

    if (this.token != null)
    {
      this.role = this.tokenStorage.getRole()?.toString();
      console.log(this.role);

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

}
