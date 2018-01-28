import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuOrdersComponent } from './manu-orders.component';

describe('ManuOrdersComponent', () => {
  let component: ManuOrdersComponent;
  let fixture: ComponentFixture<ManuOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManuOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManuOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
