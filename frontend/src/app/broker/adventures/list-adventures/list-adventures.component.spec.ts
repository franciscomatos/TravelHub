import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdventuresComponent } from './list-adventures.component';

describe('ListAdventuresComponent', () => {
  let component: ListAdventuresComponent;
  let fixture: ComponentFixture<ListAdventuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAdventuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAdventuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
