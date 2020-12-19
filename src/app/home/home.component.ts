import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  name: FormControl = new FormControl('', [
    Validators.required
  ]);
  roomCode: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(4)
  ]);

  joinRoomForm: FormGroup = new FormGroup({
    name: this.name,
    roomCode: this.roomCode
  });

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSubmit(formData: any) {
    console.info('Received room code', formData.roomCode.toUpperCase());
  }
}
