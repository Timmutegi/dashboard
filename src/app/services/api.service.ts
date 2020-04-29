import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://mbima.bluewaveinsurance.co/api/';

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient) { }

  get(endpoint: string) {
    return this.http.get<any>(this.baseUrl + endpoint, this.httpOptions);
  }

  login(endpoint: string, data: JSON) {
    return this.http.post<any>(this.baseUrl + endpoint, data);
  }
}
