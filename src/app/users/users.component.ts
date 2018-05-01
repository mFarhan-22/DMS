import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/user.service';
import { UserTypeService } from '../user-type/shared/user-type.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers:[UserService, UserTypeService]
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService, private userTypeService: UserTypeService) { }

  ngOnInit() {
  }

}
