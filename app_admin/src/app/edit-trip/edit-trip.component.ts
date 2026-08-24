import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
@Component({selector:'app-edit-trip',standalone:true,imports:[CommonModule,ReactiveFormsModule,RouterLink],templateUrl:'./edit-trip.component.html'})
export class EditTripComponent implements OnInit {
 public editForm!:FormGroup; submitted=false; error=''; message=''; originalCode='';
 constructor(private formBuilder:FormBuilder,private route:ActivatedRoute,private router:Router,private tripDataService:TripDataService){}
 ngOnInit():void{this.originalCode=this.route.snapshot.paramMap.get('tripCode')||'';if(!this.originalCode){this.router.navigate(['/']);return;}this.editForm=this.formBuilder.group({code:[this.originalCode,Validators.required],name:['',Validators.required],length:['',Validators.required],start:['',Validators.required],resort:['',Validators.required],perPerson:['',Validators.required],image:['',Validators.required],description:['',Validators.required]});this.tripDataService.getTrip(this.originalCode).subscribe({next:(trip)=>{const start=trip.start?new Date(trip.start).toISOString().slice(0,10):'';this.editForm.patchValue({...trip,start});this.message=`Editing ${trip.name}`;},error:(e)=>{console.error(e);this.error='Unable to retrieve trip.';}});}
 get f(){return this.editForm.controls;}
 onSubmit():void{this.submitted=true;if(this.editForm.invalid)return;this.tripDataService.updateTrip(this.originalCode,this.editForm.value).subscribe({next:()=>this.router.navigate(['/']),error:(e)=>{console.error(e);this.error=e.error?.message||'Unable to update trip.';}});}
}
