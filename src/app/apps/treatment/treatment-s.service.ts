import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// tslint:disable-next-line:rxjs-no-wholesale
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreatmentSService {

  constructor(private http: HttpClient) { }

  getTreatment(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/treatment/all');
  }
}
