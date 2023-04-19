import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  studenturl='http://localhost:3000/students';
  clgurl='http://localhost:3000/collage';

  constructor(private http:HttpClient) { }

  getdata(){
    return this.http.get(this.clgurl);   
  }
  senddata(Om: any): Observable<object>{
    // console.log(Om," -fs")
    return this.http.post<object>(this.clgurl,Om)}
  deletdat(useId:number):Observable<number>{
    // console.log(useId)
    return this.http.delete<number>(this.clgurl+"/"+useId);
  }  
  editdata(useId:number,title:string):Observable<number>{
    console.log(useId)
    return this.http.put<number>(this.clgurl+"/"+useId,{"title":title})
  }




  // -----------------------------------------------------------------------
  // ---------------------------FOR STUDENTS DATA---------------------------
  // -----------------------------------------------------------------------


  getstudentdata(){
    return this.http.get(this.studenturl);   
  }
  sendstddata(studentdata:any):Observable<object>{
    console.log(studentdata)
    return this.http.post<object>(this.studenturl,studentdata)
  }
  deletstudent(useId:number):Observable<number>{
    // console.log(useId)
    return this.http.delete<number>(this.studenturl+"/"+useId);
  } 

  getFetchOne(userId:number):Observable<any>{
  
      return this.http.get<number>(this.studenturl+"/"+userId)
      // return this.http.get<number>(`{this.studenturl}${userId}`)
  }
  
  editStudentData(useId:number,data:any):Observable<any>{
    console.log(data.fname)
    return this.http.put<number>(this.studenturl+"/"+useId,{
      "fname": data.fname,
      "lname": data.lname,
      "email": data.email,
      "phone": data.phone,
      "clgname2": data.clgname2,
      "gender": data.gender,
      "dob": data.dob,
    })
  }


}
