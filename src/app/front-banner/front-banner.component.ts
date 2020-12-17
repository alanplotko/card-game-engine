import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-front-banner',
  templateUrl: './front-banner.component.html',
  styleUrls: ['./front-banner.component.css']
})
export class FrontBannerComponent implements OnInit {
  joinRoomForm;

  constructor(private formBuilder: FormBuilder) {
    this.joinRoomForm = this.formBuilder.group({
      roomCode: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(formData: any) {
    console.info('Received room code', formData.roomCode.toUpperCase());
  }
}
