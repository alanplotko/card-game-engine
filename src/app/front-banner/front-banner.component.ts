import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-front-banner',
  templateUrl: './front-banner.component.html',
  styleUrls: ['./front-banner.component.css']
})
export class FrontBannerComponent implements OnInit {
  roomCode: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(4)
  ]);

  joinRoomForm: FormGroup = new FormGroup({
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
