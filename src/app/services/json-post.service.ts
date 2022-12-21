import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JsonPostService {

  url :string="http://localhost:8080/BankApp";
  constructor(private http:HttpClient) { }
  
  register(data:any): Observable<any>{
    return this.http.post<any>("http://localhost:8080/BankApp/register",data)
    // .pipe(map((res:any)=>{
    //   return res;
    // }))
  }
  
  getUser(email:any,password:any):any{
    return this.http.get<any>(this.url+email+password)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
  updateUser(data:any,id:number):any{
    return this.http.put<any>(this.url+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
  deleteUser(id:number):any{
    return this.http.delete<any>(this.url+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
