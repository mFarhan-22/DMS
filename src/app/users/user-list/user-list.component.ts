import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.userService.Get();
  }

  onEdit(user: User) {
    this.userService.selectedUser = Object.assign({}, user);
  }

  onDelete(id: number) {
    if(confirm("Are you sure you want to delete this record ?") == true){
      this.userService.Delete(id)
      .subscribe(x => {
        this.toastr.warning('Record Successfully Deleted', 'User Registration');
        this.userService.Get();
      });      
    }
  }
}
