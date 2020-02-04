import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulksComponent } from './bulks.component';

describe('BulksComponent', () => {
  let component: BulksComponent;
  let fixture: ComponentFixture<BulksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
