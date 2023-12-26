import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames =["Gena", "Lena"]

  ngOnInit() {
    this.signupForm = new FormGroup({
      "userData": new FormGroup({
        "username": new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        "email": new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      "gender": new FormControl('male'),
      "hobbies": new FormArray([])
    });

    //1 listen to updates in form:   statusChanges- , signupForm.valueChanges.subscribe
    // this.signupForm.valueChanges.subscribe((value)=>console.log(value)) // изменение по клику
    this.signupForm.statusChanges.subscribe((status)=>console.log(status));

    //2 update the form by myself: signupForm.setValue
    this.signupForm.setValue({
      'userData':{
        'username':'Lery',
        'email': 'lery.test.com'
      },
      'gender': 'male',
      'hobbies':[]
    });

    //3 update part of form by myself: signupForm.patchValue
    this.signupForm.patchValue({
      'userData':{
        'username':'Vika',
      }
    });
  }

  forbiddenNames(control:FormControl):{[s:string]: boolean} {
   if(this.forbiddenUserNames.includes(control.value)){
     return {"nameIsForbidden": true}
   }
    return null
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset(); //4 reset: can pass object to reset to special values
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);

    (<FormArray>this.signupForm.get("hobbies")).push(control)
  }


  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
const promise = new Promise<any>((resolve, reject)=>{
  setTimeout(()=>{
    if(control.value==='test@test.com') {
      resolve({'emailIsForbidden':true});
    } else{
    resolve(null)
    }
  },1500);
});
return promise;
}

}
