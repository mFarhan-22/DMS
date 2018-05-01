import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { UserTypeService } from '../../user-type/shared/user-type.service';
import { UserType } from '../../user-type/shared/user-type.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private userTypeService: UserTypeService, private toastr: ToastrService) { }
  

  ngOnInit() { 
    this.resetForm();
    this.userTypeService.getUserTypeList();    
  }

  resetForm(form? : NgForm){
    if(form != null)
      form.reset();
       
    this.userService.selectedUser = {
      Id : 0,
      Name : '',
      LoginUserName : '',
      Password : '',
      UserRoleCode : 0,
      OrganizationCode : null,
      Email : '',
      PhoneNo : '',
      IsActive : 'Y',
      UserRole : '',
      OrganizationName : ''
    }
  }

  onSubmit(form : NgForm){
    if(form.value.Id <= 0){
      this.userService.Post(form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.userService.Get();
        this.toastr.success('New Record Added Successfully', 'User Registration');
      })
    }
    else if(form.value.Id > 0){
      this.userService.Put(form.value.Id, form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.userService.Get();
        this.toastr.info('Record Updated Successfully', 'User Registration');
      })
    }
  }

}
