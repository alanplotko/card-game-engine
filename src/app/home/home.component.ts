import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { UserRegistration, UserTokenService } from '../user-token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Form Setup
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

  constructor(private storage: LocalStorageService, private userTokenService: UserTokenService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const registration: UserRegistration = this.storage.retrieve('user') ?? undefined;
    if (registration === undefined) {
      this.userTokenService.registerNewUser()
        .subscribe(
          (newRegistration: UserRegistration) => {
            console.log("Registered new token and profile", JSON.stringify(newRegistration));
            this.storage.store('user', newRegistration);
          },
          err => {
            return console.error(err);
          }
        );
    } else {
      this.userTokenService.getUserProfile(registration.token)
        .subscribe(
          (registration: UserRegistration) => {
            console.log(`Synced user ${registration.token} with server`);
            this.storage.store('user', registration);
          },
          err => {
            return console.error(err);
          }
        );
    }
  }

  onSubmit(formData: any) {
    console.info('Received room code', formData.roomCode.toUpperCase());
  }
}
