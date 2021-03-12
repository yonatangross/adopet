import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AdoptionRequest } from "../models";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AdoptionRequestService {
  private baseUrl = `${environment.apiUrl}/adoption-requests`;

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  getAll(params: any): Observable<any> {
    return this.http.get<AdoptionRequest[]>(this.baseUrl, { params });
  }

  getAllGroups(): Observable<any> {
    const res = this.http.get<{ _id: string; data: AdoptionRequest[] }[]>(
      `${this.baseUrl}/groups`
    );
    return res;
  }
  get(id: string): Observable<any> {
    const res = this.http.get<AdoptionRequest>(`${this.baseUrl}/${id}`);
    return res;
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
