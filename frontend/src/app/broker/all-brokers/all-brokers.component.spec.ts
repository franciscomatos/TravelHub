import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBrokersComponent } from './all-brokers.component';

describe('AllBrokersComponent', () => {
  let component: AllBrokersComponent;
  let fixture: ComponentFixture<AllBrokersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBrokersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBrokersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
