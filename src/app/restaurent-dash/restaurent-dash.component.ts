import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestaurantData } from './restaurent.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent {
  
  formValue!:FormGroup
  restaurentModelObj:RestaurantData = new RestaurantData()
  allRestaurantData:any
  showAdd!:boolean
  showUpdate!:boolean

  constructor(private formBuilder:FormBuilder, private api:ApiService){}
  
  ngOnInit():void {
    this.formValue = this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      address:[''],
      services:['']
    })
    this.getAllData()
  }

  //Méthode qui gère l'affichage conditionnel de Add Details ou de Update Detail dans le Modal
  clickAddResto(){
    this.formValue.reset()
    this.showAdd=true
    this.showUpdate=false
  }

  //Methodes CRUD pour nos restaurant
  addResto(){
    this.restaurentModelObj.name=this.formValue.value.name;
    this.restaurentModelObj.email=this.formValue.value.email;
    this.restaurentModelObj.mobile=this.formValue.value.mobile;
    this.restaurentModelObj.address=this.formValue.value.address;
    this.restaurentModelObj.services=this.formValue.value.services;
    
    this.api.postRestaurant(this.restaurentModelObj).subscribe(res=>{
      console.log(res);
      alert("Restaurant Ajouté avec Succes");
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset();
      this.getAllData()
    },
    err=>{
      alert("Erreur lors de l'ajout !!! error "+err);
    })    
  }

  getAllData(){
    this.api.getRestaurant().subscribe(res=>{
      this.allRestaurantData=res
    })
  }

  deleteResto(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res=>{
      this.allRestaurantData=res;
      alert("Restaurant {{data.name}} supprimé de la liste")
      this.getAllData()
    })
  }

  onEditResto(data:any){
    this.showAdd=false
    this.showUpdate=true

    this.restaurentModelObj.id=data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  updateResto(){
    this.restaurentModelObj.name=this.formValue.value.name;
    this.restaurentModelObj.email=this.formValue.value.email;
    this.restaurentModelObj.mobile=this.formValue.value.mobile;
    this.restaurentModelObj.address=this.formValue.value.address;
    this.restaurentModelObj.services=this.formValue.value.services;

    this.api.updateRestaurant(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
      alert("Mise à jour du restaurant réussie.");
      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset();
      this.getAllData()
    })
  }
}
