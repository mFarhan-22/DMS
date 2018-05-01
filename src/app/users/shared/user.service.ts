import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Common } from '../../scripts/common';
import { User } from './user.model';

// trying a change
@Injectable()
export class UserService {

  selectedUser: User;
  userList: User[];
  constructor(private http: Http) {
    this.selectedUser = new User();
    Common.API_BASE_URL = "http://192.168.1.17:8012";
   }

   Get(id? : number){
    this.http.get(Common.API_BASE_URL+'/api/v1/security/UserInformation')
    // this.http.get('http://localhost:1560/api/v1/security/UserInformation')
    .map((data : Response) =>{
      return data.json() as User[];
    }).toPromise().then(x => {
      this.userList = x;
    })
  }
   
   Post(usr: User){
     var body = JSON.stringify(usr);
     var headerOptions = new Headers({'Content-Type':'application/json'});
     var requestOptions = new RequestOptions({method : RequestMethod.Post, headers: headerOptions});
     return this.http.post(Common.API_BASE_URL+'/api/v1/security/UserInformation', body, requestOptions).map(x => x.json());
    // return this.http.post(Common.API_BASE_URL+'/api/v1/security/UserInformation', body, requestOptions).map(x => x.json());
   }

   Put(id: number, usr: User){
      var body = JSON.stringify(usr);
      var headerOptions = new Headers({'Content-Type':'application/json'});
      var requestOptions = new RequestOptions({method : RequestMethod.Put, headers: headerOptions});
      return this.http.put(Common.API_BASE_URL+'/api/v1/security/UserInformation?id='+id, body, requestOptions).map(x => x.json());
    // return this.http.post(Common.API_BASE_URL+'/api/v1/security/UserInformation', body, requestOptions).map(x => x.json());
    }

    Delete(id: number){
      return this.http.delete(Common.API_BASE_URL+'/api/v1/security/UserInformation?id='+id).map(x => x.json());
    }

}