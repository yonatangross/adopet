import { Component } from "@angular/core";
import { AuthenticationService } from "./../../services/authentication.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent {
  form: any = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = "";

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const { firstName, lastName, email, password } = this.form;

    console.log({ firstName, lastName, email, password });

    this.authenticationService
      .register(firstName, lastName, email, password)
      .subscribe(
        (data) => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        },
        (err) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      );
  }
}
