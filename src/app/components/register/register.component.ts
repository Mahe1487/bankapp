import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { JsonPostService } from 'src/app/services/json-post.service';
import { User } from 'src/app/user';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  userModelObj: User = new User();
  formRegister !: FormGroup;

  constructor(private formBuilder: FormBuilder, private jsonserver: JsonPostService) {
    this.formRegister = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      fatherName: new FormControl('', [Validators.required]),
      motherName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,25}'))]),
      conformPassword: new FormControl('', [Validators.required, Validators.pattern(('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,25}'))]),
      email: new FormControl('', [Validators.email]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      aadhar: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
      panCard: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      terms: new FormControl('', [Validators.required]),
      permanentAddress: new FormControl('', [Validators.required]),
      accountType: new FormControl('', [Validators.required])
    }, {
      validators: this.Mustmatch('password', 'conformPassword')
    });
  }

  get f() {
    return this.formRegister.controls;
  }
  public SubmitForm(formdata: any) {
    alert(JSON.stringify(formdata));
  }

  ngOnInit(): void {

  }
  register() {
    this.userModelObj.firstName = this.formRegister.value.firstName;
    this.userModelObj.lastName = this.formRegister.value.lastName;
    this.userModelObj.email = this.formRegister.value.email;
    this.userModelObj.mobile = this.formRegister.value.mobile;
    this.userModelObj.dob = this.formRegister.value.dob;
    this.userModelObj.gender = this.formRegister.value.gender;
    this.userModelObj.fatherName = this.formRegister.value.fatherName;
    this.userModelObj.motherName = this.formRegister.value.motherName;
    this.userModelObj.aadhar = this.formRegister.value.aadhar;
    this.userModelObj.panCard = this.formRegister.value.panCard;
    this.userModelObj.password = this.formRegister.value.password;
    //this.userModelObj.conformPassword = this.formRegister.value.conformPassword;
    this.userModelObj.permanentAddress = this.formRegister.value.permanentAddress;
    this.userModelObj.accountType = this.formRegister.value.accountType;
    this.userModelObj.terms = this.formRegister.value.terms;

    // this.jsonserver.register(this.userModelObj)
    //   .subscribe((res: any) => {
    //     alert("user add successfully!...");
    //     let ref = document.getElementById("cancel")
    //     ref?.click();
    //     this.formRegister.reset();
    //   }, (err: any) =>{
    //     alert(err);
    //   });

    //   // ,() => {
    //   //     alert("somthing wrong !... plese check ")
    //   //   }

    this.jsonserver.register(this.userModelObj).subscribe(
      (res: any) => {

      }, (err: any) => {
        alert(err);
      });

    // .subscribe(() => {
    //   alert("user add successfully!...");       
    //   this.formRegister.reset();       
    // },() => {
    //      alert("somthing wrong !... plese check ")
    //    })
  }
  Mustmatch(password: any, conformPassword: any) {
    return (formRegister: FormGroup) => {
      const passwordControl = formRegister.controls[password];
      const conformPasswordControl = formRegister.controls[conformPassword];

      if (conformPasswordControl.errors && !conformPasswordControl.errors['Mustmatch']) {
        return;
      }

      if (passwordControl.value !== conformPasswordControl.value) {
        conformPasswordControl.setErrors({ Mustmatch: true });
      } else {
        conformPasswordControl.setErrors(null);
      }
    }

  }

}
