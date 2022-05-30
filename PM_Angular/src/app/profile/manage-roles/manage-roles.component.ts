import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/dashboardScreen/dashboard.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/login/user';
import { first } from 'rxjs/operators';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {
  allUsers!: User[];
  selectedUser!: User;
  changeRoleForm: FormGroup | any = null;
  roles = [{name:"Project Manager", id:3}, {name:"Employee", id:4}];
  returnUrl!: string;
  modalRef!:NgbModalRef;

  constructor(private router:Router,private dashboardService:DashboardService, private profileService:ProfileService,private formBuilder:FormBuilder, private modalService:NgbModal) { }

  ngOnInit() {
    this.dashboardService.loadUsers()
    .pipe(first())
    .subscribe(data => {
      this.allUsers = data
    })

    this.changeRoleForm = this.formBuilder.group({
      role: [""] 
    })

    this.returnUrl = '/profile/roles';

  }

  get f() {return this.changeRoleForm.controls;}

  openChangeRole(changeRole: any, e:any) {
    this.selectedUser = this.allUsers.filter((x:User) => x.username == e.target.innerText)[0]
    this.f['role'].setValue(this.selectedUser.userRolesId)
    this.modalRef = this.modalService.open(changeRole, {ariaLabelledBy: 'modal-basic-title'});
  }

  selectRole(e: any){
    this.f['role'].setValue(e.target.value)
  }

  submitChange() {
    this.modalRef.close()
    this.profileService.editRole(this.selectedUser.id, this.f['role'].value)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigateByUrl('/', {skipLocationChange:true}).then(() => {
          this.router.navigate([this.returnUrl])
        })
        console.log("submitted", data)
      }
    )
  }

}
