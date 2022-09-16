import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username:null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  user = '';
  userRole = '';

  constructor(private authService: AuthService,
     private tokenStorage: TokenStorageService,
     private userService: UserService,
     private router: Router,) { }

  ngOnInit(): void {
    if(this.tokenStorage.getToken()) {
      this.isLoggedIn=true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password)
    .subscribe(
      data => {
        this.tokenStorage.saveToken(JSON.stringify(data['token']).replace(/['"]+/g, ''));
        this.tokenStorage.saveUser((this.form.username));

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        let userDetails = this.userService.getUserUsername(this.form.username)


        userDetails.subscribe(
          result => {
            this.tokenStorage.saveRole(result.role);
          }
        );

      },
      err => {
        this.errorMessage = err;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
