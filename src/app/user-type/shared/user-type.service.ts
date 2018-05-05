import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { UserType } from '../shared/user-type.model';
import { Common } from '../../scripts/common';

@Injectable()
export class UserTypeService {

  userTypeList: UserType[] = [];
  userTypeListOptions: UserType[] = [];
  userTypeSelectOption: UserType;

  constructor(private http: Http) { 

    Common.API_BASE_URL = "http://182.184.117.120:8012";
    this.userTypeSelectOption = new UserType();
    this.userTypeSelectOption.Id = 0;
    this.userTypeSelectOption.Name = "--Select--";
    this.userTypeSelectOption.IsActive = "Y";
    this.userTypeSelectOption.Description = "";
  }

  push(obj: UserType){
    this.userTypeList.push(obj);
  }

  getUserTypeList(id? : number){
    this.http.get(Common.API_BASE_URL+'/api/v1/security/UserRoles')
    .map((data : Response) =>{
      var res = data.json() as UserType[];
      return res;
    }).toPromise().then(x => {
      this.userTypeList = x;
      this.userTypeListOptions = x;
      this.userTypeListOptions.splice(0, 0, this.userTypeSelectOption);// .push(this.userTypeSelectOption);
      console.log(this.userTypeListOptions);
    })
  }
}
