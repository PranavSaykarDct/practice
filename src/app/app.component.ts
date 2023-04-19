// import { Component } from '@angular/core';
// import { OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { StudentsComponent } from './students/students.component';
// import {FormControl, FormGroup, Validators} from '@angular/forms';


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('dimBox', [
      state('notDimmed',
        style({ filter: 'blur(0px)' })
      ),
      state('dimmed',
        style({ filter: 'blur(10px)' })
      ),
      transition('notDimmed => dimmed', [
        animate('0.3s')
      ]),
      transition('dimmed => notDimmed', [
        animate('.5s')
      ])
    ]),
    trigger('disBox', [
      state('notDimmed',
        style({ display: 'none' })
      ),
      state('dimmed',
        style({ display: 'block' })
      ),
      transition('notDimmed => dimmed', [
        animate('.5s')
      ]),
      transition('dimmed => notDimmed', [
        animate('0.3s')
      ])
    ])
  ]

})
export class AppComponent {
  blurlavel = '10px'
  studentformshow = false;
  title = 'mat-practice';
  editclgnameid = 0
  dataSource: any;
  data: any;
  studentdata: any;
  sendclg: any;
  myForm!: FormGroup;

  //  a={
  //   "id": 30,
  //   "title": "pranav"
  // }
  constructor(private api: ApiService, private fb: FormBuilder) {
    this.getclg()
    this.getstudents()
  }
  ngOnInit() {
    this.myForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      phone: ['', Validators.required],
      clgname2: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
    });
  }



  displaystdform() {
    // this.myForm.setValue({
    //   fname: '',
    //   lname: '',
    //   phone: '',
    //   clgname2: '',
    //   gender: '',
    //   dob: '',
    //   email: '',
    // });
    if (this.studentformshow == false) this.studentformshow = true;
    else this.studentformshow = false;

  }
  getclg() {
    this.api.getdata().subscribe((response) => {
      this.data = response;
      console.log(response)
      this.data = this.data;
      // console.log(this.data.i)
    })

  }
  addClg(temp: string) {

    if (temp != "") {
      this.sendclg = { "id": this.data.lenght, "title": temp };
      this.api.senddata(this.sendclg).subscribe((result) => {
        console.log(this.sendclg)
      })
      this.getclg()
    }

  }

  delclg(userId: number, clgname: string) {
    for (var temp of this.studentdata) {
      if (temp.clgname2 === clgname) {
        this.delstudent(temp.id);
        // console.log(temp.fname)
      }
    }
    this.api.deletdat(userId).subscribe((result) => {
      console.log(result)
    })

    this.getclg()
    this.getclg()
  }
  changeinput(userId: number) {
    this.editclgnameid = userId
  }
  editclg(userId: number, text: string) {

    this.api.editdata(userId, text).subscribe((result) => {
      console.log(result)
    })
    this.getclg()
    this.editclgnameid = 0
  }


  // ----------------------------------------------
  // STUDENT DATA FUNCTIONS
  // ----------------------------------------------
  onSubmit() {
    // Do something with the form data
    console.log(this.myForm.value);
  }


  getstudents() {
    this.api.getstudentdata().subscribe((response) => {
      this.studentdata = response;
    })
  }

  delstudent(userId: number) {
    this.api.deletstudent(userId).subscribe((result) => {
      console.log(result)
    })
    this.getstudents()
  }
  // Edit User Details.
  tempId = 0;
  editUser(UserId: number) {
    // console.log(UserId)
    this.tempId = UserId
    this.inta = 2
    this.api.getFetchOne(UserId).subscribe((result) => {
      // this.tempval=result
      console.log(result.clgname2)
      if (result.fname) {


        this.myForm.setValue({
          fname: result.fname,
          lname: result.lname,
          phone: result.phone,
          clgname2: result.clgname2,
          gender: result.gender,
          dob: result.dob,
          email: result.email,
        });
      }
    })

    this.studentformshow = true;

  }
  inta = 1
  sendstudentdata() {
    if (this.inta == 1) {
      if (this.myForm.value.fname != "")
        this.api.sendstddata(this.myForm.value).subscribe((result) => {
          // console.log(result)
        })
    } else {
      this.api.editStudentData(this.tempId, this.myForm.value).subscribe((result) => {
        console.log(result)
      })
      this.inta = 1
      this.getstudents()
      this.myForm.setValue({
        fname: '',
        lname: '',
        phone: '',
        clgname2: '',
        gender: '',
        dob: '',
        email: '',
      })
    }
    this.getstudents()
  }








}
