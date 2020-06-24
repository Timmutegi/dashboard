import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyholderschartComponent } from './policyholderschart.component';

describe('PolicyholderschartComponent', () => {
  let component: PolicyholderschartComponent;
  let fixture: ComponentFixture<PolicyholderschartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyholderschartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyholderschartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
