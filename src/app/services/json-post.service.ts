import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class JsonPostService {

  url :string="http://localhost:3000/register/";
  constructor(private http:HttpClient) { }
  
  register(data:any): any{
    return this.http.post<any>(this.url,data)
    .pipe(map((res:any)=>{
      return res;
    }))
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
