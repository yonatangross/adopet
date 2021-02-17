import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  readonly APIPath = "/pets";

  constructor(private HttpClient:HttpClient) { }

  // getDepList():Observable<any[]>{
  //   return this.http.get<any>(this.APIUrl+'/department');
  // }

  // addDepartment(val:any){
  //   return this.http.post(this.APIUrl+'/Department',val);
  // }

  // updateDepartment(val:any){
  //   return this.http.put(this.APIUrl+'/Department',val);
  // }

  // deleteDepartment(val:any){
  //   return this.http.delete(this.APIUrl+'/Department/'+val);
  // }



}
