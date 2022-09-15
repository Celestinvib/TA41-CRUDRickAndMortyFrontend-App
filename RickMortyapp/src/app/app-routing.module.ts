import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CharactersComponent } from './characters/characters.component';
import { CharacterComponent } from './character/character.component';
import { CharacterAddComponent } from './character-add/character-add.component';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'characters',
    component: CharactersComponent
  },
  {
    path: 'characters/character/:id',
    component: CharacterComponent
  },
  {
    path: 'characters/add',
    component: CharacterAddComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
