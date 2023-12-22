import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

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
        "email": new FormControl(null, [Validators.required, Validators.email]),
      }),
      "gender": new FormControl('male'),
      "hobbies": new FormArray([])
    });
  }

  forbiddenNames(control:FormControl):{[s:string]: boolean} {
   if(this.forbiddenUserNames.includes(control.value)){
     return {"nameIsForbidden": true}
   }
    return null
  }

  onSubmit() {
    console.log(this.signupForm)
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);

    (<FormArray>this.signupForm.get("hobbies")).push(control)
  }


  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }
}
