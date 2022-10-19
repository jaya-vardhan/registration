import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import {User} from './users.interface'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent{
  title = 'userregistration';
  users : User[] = []
  private user: User = {name: '', email: '', phoneNumber: '', address: '', text: 'Show'}
  private emailRegex: string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
  private phoneNumberRegex: string = "^[9876][0-9]{9}$";
  private  message = '';
  
  constructor(private formBuilder: FormBuilder){}
  
  //creating registration form using formbuilder.
  registrationFrom = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
    phoneNumber: ['', [Validators.required, Validators.pattern(this.phoneNumberRegex)]],
    address: ['', Validators.required]
  })

  // handlig the submit and saving the value in the array.
  handleSubmit(){
    this.user= {
      name : this.registrationFrom.value?.name,
      email: this.registrationFrom.value?.email,
      phoneNumber: this.registrationFrom.value?.phoneNumber,
      address: this.registrationFrom.value?.address,
      text: "Show"
    }
    this.users.push(this.user);
    this.registrationFrom.reset();
 }


//  changing the button text on clicking that button form show - hide and hide - show.
  changeText(index: any){
    try {
      this.message = this.users[index]?.text;
      if(this.message && this.message == "Show"){
        this.users[index].text = "Hide"
      }else if (this.message){
        this.users[index].text = "Show"
      }
    } catch (error) {
      console.log("No user found", error);
    }
  }

  //deleting the user
  deleteUser(index: any){
    try{
      this.users.splice(index, 1);
    }catch (error){
      console.log("No user found", error);
    }
  }
}
