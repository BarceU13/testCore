import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
//import {  } from '@ser';
import { AuthenticationService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    @Input() email : string;
    @Input() password : string;
    @Output() propagar = new EventEmitter<string>();

  constructor( 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService)
    { 
      //Redirigir si ya hay sesion
      if (this.authenticationService.currentUserValue) {
         this.router.navigate(['/home']);
      }
    }

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });
    }

  get f() { return this.loginForm.controls; }
  
  onSubmit() {
   
      this.submitted = true;
      //Si es invalida retornar
      if (this.loginForm.invalid) {
        return;
      }
      //Llamada de servicio con decoradores 
      this.authenticationService.login(this.email, this.password)
      //this.authenticationService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe(
              data => { 
                  console.log(data)
                  
                  if(data.status === 200){ 
                    this.propagar.emit(this.email);
                    this.router.navigate(['/home']); 

                  }
                  else{
                    alert('El email o contraseña no coincide')
                  }
              },
              error => { alert('Sucedió un error'); });
  }

}
