import { TokenStorageService } from "./../../services/token-storage.service";
import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../services/authentication.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-dashboard",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = "";

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authenticationService.login(email, password).subscribe(
      (data) => {
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUser(data.user);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    this.router.navigate(["/dashboard"]);
  }
}
