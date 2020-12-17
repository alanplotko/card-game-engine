import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontBannerComponent } from './front-banner.component';

describe('FrontBannerComponent', () => {
  let component: FrontBannerComponent;
  let fixture: ComponentFixture<FrontBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
