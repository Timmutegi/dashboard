import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UssdSessionsComponent } from './ussd-sessions.component';

describe('UssdSessionsComponent', () => {
  let component: UssdSessionsComponent;
  let fixture: ComponentFixture<UssdSessionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UssdSessionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UssdSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
