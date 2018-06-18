import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { IQuestion } from './questionList';

@Injectable()
export class FeedbackDataServiceService {

  private directUrl = 'http://mcdpod01.eur.ad.sag:8000/all';
  private postUrl = 'http://mcdpod01.eur.ad.sag:8000/submit';
  private adminUrl = 'http://mcdpod01.eur.ad.sag:8000/admin_dashboard';
    constructor(private http: HttpClient) { }

    getQuestions():  Observable<IQuestion[]> {
    return this.http.get<IQuestion[]>(this.directUrl);
  }
  postQuestion(finalSubmission) {
    const Options = {
      headers: new HttpHeaders({
     'Content-Type': 'application/json'
   })
 };
    return this.http.post(this.postUrl, JSON.stringify(finalSubmission), Options);
    // console.log(finalSubmission);
  }

  getAdminData(): Observable<any> {
    return this.http.get(this.adminUrl);
   // console.log('TESTING SERVICE  ' + this.adminUrl);
  }
 }
