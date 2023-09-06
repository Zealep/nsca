import { Component, Input } from '@angular/core';
import { AuthenticationService } from '../services/auth/authentication.service';
import { SpinnerOverlayService } from '../services/overlay.service';
import { ToastService } from '../services/toast.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  invalidLogin = false

  @Input() error: string | null | undefined;

  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });


  constructor(private router: Router,
    private authService: AuthenticationService,
    private spinnerService: SpinnerOverlayService,
    private toastService: ToastService) {

  }

  ngOnInit() {

  }

  submit() {
    if (this.form.valid) {
      this.checkLogin();
    }
  }


  checkLogin() {
    let username: string = this.form.get('username')?.value;
    let clave: string = this.form.get('password')?.value;

    (this.authService.authenticate(username.trim(), clave.trim()).subscribe(
      data => {
        //this.getIp()
        this.router.navigate(['calculoActuarial'])
        this.invalidLogin = false
      },
      error => {
        this.invalidLogin = true
        this.error = error.error.message;

      }
    )
    );

  }

  getIp() {
    this.authService.getIp().subscribe(x => {
      console.log('ip', x);
    })
  }
}
