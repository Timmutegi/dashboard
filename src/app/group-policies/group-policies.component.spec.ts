import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPoliciesComponent } from './group-policies.component';

describe('GroupPoliciesComponent', () => {
  let component: GroupPoliciesComponent;
  let fixture: ComponentFixture<GroupPoliciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupPoliciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
