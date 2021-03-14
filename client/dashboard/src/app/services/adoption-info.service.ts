import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AdoptionInfo } from "../models";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class AdoptionInfoService {
  private baseUrl = `${environment.apiUrl}/adoptions-info`;

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient) {}

  getAll(params: any): Observable<any> {
    return this.http.get<AdoptionInfo[]>(this.baseUrl, { params });
  }

  get(id: string): Observable<any> {
    return this.http.get<AdoptionInfo>(`${this.baseUrl}/${id}`);
  }

  getByPetId(petId: string): Observable<any> {
    return this.http.get<AdoptionInfo>(`${this.baseUrl}/${petId}`);
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
