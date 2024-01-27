import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  loginForm!:FormGroup

  constructor(private formBuilder:FormBuilder, private _http:HttpClient, private router:Router){
  }
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      email:[''],
      password:['']
    })
  }

  login(){
    this._http.get<any>("http://localhost:3000/signup").subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
      })

      if (user){
        alert("Connexion réussie")
        this.loginForm.reset()
        this.router.navigate(['restaurent'])
      } else{
        alert("Erreur veuillez ressaisir vos email & password")
      }

    }, err=>{
      alert("Erreur Serveur")
    })
  }
}
