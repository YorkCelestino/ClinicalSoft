import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// tslint:disable-next-line:rxjs-no-wholesale
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  constructor(private http: HttpClient) { }

    // getting treatement
    getTreatment(): Observable<any> {
      return this.http.get(environment.apiBaseUrl + '/treatment/all');
    }

   // adding treatement
   addTreatement(treatment: any): Observable<any> {
     return this.http.post(environment.apiBaseUrl + '/treatment/add', treatment);
   }

   // update  treatement
   updateTreatement(treatement: any): Observable<any> {
    return this.http.put(environment.apiBaseUrl + '/treatment/edit', treatement);
  }
  // Change status
  changeStatus(isActive: boolean, id: string): Observable<any> {

    return this.http.put(environment.apiBaseUrl + '/treatment/change-status',
    { id: id, isActive: !isActive });

  }

}
