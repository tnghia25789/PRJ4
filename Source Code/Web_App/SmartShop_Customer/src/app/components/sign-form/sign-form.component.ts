import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Customer } from 'src/app/common/Customer';
import { Login } from 'src/app/common/Login';
import { Register } from 'src/app/common/Register';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { SendmailService } from 'src/app/services/sendmail.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.css']
})
export class SignFormComponent implements OnInit {

  login!: Login;
  register !: Register;
  show: boolean = false;
  loginForm: FormGroup;
  registerForm!: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string = '';
  otpcode!: any;

  constructor(
    private sendMailService: SendmailService,
    private favoriteService: FavoritesService,
    private sessionService: SessionService,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private userService: CustomerService) {
    this.loginForm = new FormGroup({
      'email': new FormControl(null),
      'password': new FormControl(null)
    });

    this.registerForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'status': new FormControl(true),
      'gender': new FormControl(true),
      'image': new FormControl('https://res.cloudinary.com/veggie-shop/image/upload/v1633795994/users/mnoryxp056ohm0b4gcrj.png'),
      'address': new FormControl(null, [Validators.required]),
      'phone': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.pattern('(0)[0-9]{9}')]),
      'registerDate': new FormControl(new Date()),
      'role': new FormControl(["USER"]),
      'otp': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
    this.checkLogin();
  }

  sign_up() {
    if (this.registerForm.invalid) {
      this.toastr.error('Please Fill The Form !', 'SYSTEM');
      return;
    }
    this.otpcode = localStorage.getItem("otp");

    if (this.registerForm.value.otp == this.otpcode && this.registerForm.value.otp != null) {
      this.register = this.registerForm.value;
      window.localStorage.removeItem("otp");

      this.authService.register(this.register).subscribe(data => {
        Swal.fire({
          icon: 'success',
          title: 'Successful Registered !',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          window.location.href = ('/');
        },
          500);
      }, error => {
        this.toastr.error(error.message, 'SYSTEM');
      });
    }
    else {
      this.toastr.error('The OTP Code Is Not Correct ! Please Check Again !', 'SYSTEM');
    }

  }

  sign_in() {
    this.login = this.loginForm.value;

    this.authService.login(this.login).subscribe(
      data => {

        this.sessionService.saveToken(data.token);
        this.isLoginFailed = false;
        this.isLoggedIn = true;

        let userTemp: Customer;
        this.userService.getByEmail(String(this.sessionService.getUser())).subscribe(data => {
          userTemp = data as Customer;
          if (userTemp.roles[0].name == 'ROLE_ADMIN') {

            Swal.fire({
              icon: 'error',
              title: 'Login fail !',
              showConfirmButton: false,
              timer: 1500
            })
            this.toastr.error('Wrong Email/Password ! Please Check Your Email/Password Again !', 'SYSTEM');

            this.isLoginFailed = true;
            this.sessionService.signOut();
            return;
          } else {
            Swal.fire({
              icon: 'success',
              title: 'Successful Login !',
              showConfirmButton: false,
              timer: 1500
            })

            this.router.navigate(['/home']);

            setTimeout(() => {
              window.location.href = ('/');
            },
              500);
          }
        })
      },
      error => {
        this.toastr.error('Wrong Email/Password ! Please Check Your Email/Password Again !', 'SYSTEM');
        Swal.fire({
          icon: 'error',
          title: 'Login fail !',
          showConfirmButton: false,
          timer: 1500
        })
        this.isLoginFailed = true;
      }
    );
  }

  sendOtp() {

    this.sendMailService.sendMailOtp(this.registerForm.value.email).subscribe(data => {
      window.localStorage.removeItem("otp");
      window.localStorage.setItem("otp", JSON.stringify(data));

      this.toastr.success('We send the OTP code to your email. Please check your email to get the OTP code.', 'SYSTEM');
    }, error => {
      if (error.status == 404) {
        this.toastr.error('This Email Is Already Registered !', 'SYSTEM');
      } else {
        this.toastr.warning('Please Enter The Correct Email !', 'SYSTEM');
      }
    });

  }

  checkLogin() {
    if (this.sessionService.getUser() != null) {
      this.router.navigate(['/home']);
      window.location.href = ('/');
    }
  }

  toggle() {
    this.show = !this.show;
  }
  sendError() {
    this.toastr.warning('Please Enter The Correct Email !', 'SYSTEM');
  }

}
