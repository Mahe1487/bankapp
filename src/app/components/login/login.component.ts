import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from 'src/app/login';
import { JsonPostService } from 'src/app/services/json-post.service';
import { User } from 'src/app/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //userData!: any;
  //loginObj: Login = new Login();
  formLogin !: FormGroup;
  userName!: string;
  password!: string;

  constructor(private formBuilder: FormBuilder, private jsonServer: JsonPostService) {
    this.formLogin = this.formBuilder.group({

      userName: new FormControl('', [Validators.required]),

      Password: new FormControl('', [Validators.required, Validators.pattern(('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,25}'))])

    });
  }
  get f() {
    return this.formLogin.controls;
  }

  ngOnInit(): void {
  }

  public SubmitForm(formdata: any) {
    alert(JSON.stringify(formdata));
  }

  sendUser(userName: string, password: string) {
    //this.userName = this.formLogin.value.userName;
    //this.password = this.formLogin.value.password;

    this.jsonServer.sendUser(userName, password)
      .subscribe((res: any) => {
        console.log(res);
        //this.userData = res;
      })
  }
}
