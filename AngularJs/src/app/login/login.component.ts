import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    localStorage.setItem;
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    this.loginService.login(this.form.value).subscribe((res: any) => {
      localStorage.setItem('userId', res.data.data.user_id);
      console.log(res.data.data.user_id);
      localStorage.setItem('loginToken', res.data.token);
      if (res.data.token) {
        alert(res.message);
        this.router.navigateByUrl('/home');
      } else {
        alert(res.message);
      }
    });
  }
}
