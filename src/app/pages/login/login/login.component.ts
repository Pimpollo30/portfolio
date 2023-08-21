import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private auth:AuthService, private router: Router
    ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    const form = this.loginForm.value;
    if (form.email && form.password) {
      this.auth.login(form.email, form.password).subscribe((res) => {
        if (res && res.success == true) {
            localStorage.setItem("accessToken", res.data.accessToken);
            this.router.navigateByUrl("/crud-notas");
        }
      });
    }
  }

  logout() {
    localStorage.removeItem("accessToken");
  }
}
