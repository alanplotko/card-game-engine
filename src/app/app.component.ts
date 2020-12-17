import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FrontBannerComponent } from './front-banner/front-banner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'card-game-engine';
}
