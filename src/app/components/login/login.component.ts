import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { JsonPostService } from 'src/app/services/json-post.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userData!: any;

  constructor(private formBuilder:FormBuilder,private jsonServer:JsonPostService) { }

  public formLogin = this.formBuilder.group({

    userName : this.formBuilder.control('',[Validators.required]),

    Password : this.formBuilder.control('',[Validators.required,Validators.pattern(('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'))])
    
  });

  get userName(){
    return this.formLogin.get('userName') as FormControl;
  }

  get Password(){
    return this.formLogin.get('Password') as FormControl;
  }

  ngOnInit(): void {
  }
  
  public SubmitForm(formdata:any){
    alert(JSON.stringify(formdata));
  }

  getUser(email:any,password:any){
    this.jsonServer.getUser(email,password)
    .subscribe((res:any)=>{
      console.log(res);
      this.userData = res;
    })
  }
}
