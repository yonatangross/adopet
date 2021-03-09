import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}
  
  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/register`,
      {
        firstName,
        lastName,
        email,
        password,
      },
      httpOptions
    );
  }

  login(email: string, password: string) {
    return this.http.post<any>(
      `${this.baseUrl}/login`,
      {
        email,
        password,
      },
      httpOptions
    );
  }
}
