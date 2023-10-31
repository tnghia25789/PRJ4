import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

import { PageService } from 'src/app/services/page.service';
import { Customer } from 'src/app/common/Customer';
import { CustomerService } from 'src/app/services/customer.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  customer!: Customer;
  postForm: FormGroup;

  //nhận giá trị từ form
  constructor(
    private modalService: NgbModal,
    private toastr: ToastrService,
    private userService: AuthService,
    private customerService: CustomerService,
    private sessionService: SessionService,
    private pageService: PageService) {
    this.postForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email])
    })
  }

  ngOnInit(): void {
    this.pageService.setPageActive('update-profile');
    this.getCustomer();
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { centered: true });
  }

  getCustomer() {
    let email = this.sessionService.getUser();
    this.customerService.getByEmail(email).subscribe(data => {
      this.customer = data as Customer;
      this.postForm = new FormGroup({
        'email': new FormControl(this.customer.email, [Validators.minLength(4), Validators.email, Validators.required]),
      })
    }, error => {
      this.toastr.error('Can Not Load Data !', 'SYSTEM');
    })
  }

  submit() {
    if (this.postForm.valid) {
      this.userService.changePassword(this.postForm.value.email).subscribe(data => {
        this.toastr.success('We sent a link to your email to change your password. Please check your mail.', 'SYSTEM');
        this.modalService.dismissAll();
        this.postForm = new FormGroup({
          'email': new FormControl(null, [Validators.required, Validators.email])
        })
      }, error => {
        if (error.status == 404) {
          this.toastr.error('This Email Has Not Registered ! Please Register First.', 'SYSTEM');
        } else {
          this.toastr.error('Error !', 'SYSTEM');
        }
      })
    }

  }

}
