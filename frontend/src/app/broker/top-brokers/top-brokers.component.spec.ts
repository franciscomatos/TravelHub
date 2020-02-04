import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBrokersComponent } from './top-brokers.component';

describe('TopBrokersComponent', () => {
  let component: TopBrokersComponent;
  let fixture: ComponentFixture<TopBrokersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBrokersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBrokersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
