import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
@Component({selector:'app-add-trip',standalone:true,imports:[CommonModule,ReactiveFormsModule,RouterLink],templateUrl:'./add-trip.component.html'})
export class AddTripComponent implements OnInit {
 public addForm!:FormGroup; submitted=false; error='';
 constructor(private formBuilder:FormBuilder,private router:Router,private tripService:TripDataService){}
 ngOnInit():void{this.addForm=this.formBuilder.group({code:['',Validators.required],name:['',Validators.required],length:['',Validators.required],start:['',Validators.required],resort:['',Validators.required],perPerson:['',Validators.required],image:['',Validators.required],description:['',Validators.required]});}
 get f(){return this.addForm.controls;}
 onSubmit():void{this.submitted=true;if(this.addForm.invalid)return;this.tripService.addTrip(this.addForm.value).subscribe({next:()=>this.router.navigate(['/']),error:(e)=>{console.error(e);this.error=e.error?.message||'Unable to add trip.';}});}
}
